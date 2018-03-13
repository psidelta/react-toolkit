const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

console.log('setting up enzyme!!!');
Enzyme.configure({ adapter: new Adapter() });
