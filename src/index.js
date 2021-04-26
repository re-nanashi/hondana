import { sideBar } from './side_bar.js';
import { Form } from './add_form.js';

const sideBars = sideBar();
const bookForm = Form();

sideBars.render();
bookForm.render();
