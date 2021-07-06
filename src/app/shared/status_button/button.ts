import './button.css';

export const statusButton = (parentNode: HTMLElement): void => {
    const buttonGroup: HTMLDivElement = document.createElement('div');
    buttonGroup.classList.add('btn-group');
    buttonGroup.innerHTML = `
        <button class="finished_reading active">読んだ</button>
        <button class="currently_reading">読んでる</button>
        <button class="want_to_read">読みたい</button>
    `;

    parentNode.append(buttonGroup);

    buttonGroup.childNodes.forEach((button) => {
        button.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            clearActive();
            (<HTMLButtonElement>button).classList.add('active');
        });
    });

    function clearActive(): void {
        const buttons = Array.from(buttonGroup.getElementsByTagName('button'));

        buttons.forEach((button: HTMLButtonElement) =>
            button.classList.remove('active')
        );
    }
};
