// webpack support `import`
import './generator';
import './body.css';
import obj from './data/obj.yaml';

console.log(obj);
document.querySelector("body").appendChild(gen.div());