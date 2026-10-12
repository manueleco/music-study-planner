const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8').split('<script>')[1].split('</script>')[0];
const elements = new Map();
const storage = new Map();
const document = {
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, {
      value: id === 'filter' ? 'Todos' : '', checked: false, innerHTML: '', textContent: '', className: '',
      handlers: {}, addEventListener(event, fn) { this.handlers[event] = fn; }, querySelectorAll() { return []; }
    });
    return elements.get(id);
  }
};
const context = vm.createContext({ document, URL, Date, structuredClone,
  localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) }
});
vm.runInContext(source, context);
assert.match(elements.get('chart').innerHTML, /<svg/);
assert.match(elements.get('tasks').innerHTML, /Seleccionar lecturas/);

const plan = { course: 'Import test', tasks: [{ id: 'T1', title: '<script>unsafe</script>',
  group: 'Estudio', start: '2026-10-12', end: '2026-10-15', where: 'javascript:alert(1)',
  instructions: ['Primer paso', 'Segundo paso'], action: 'Leer', deadline: '2026-10-15'
}], progress: { T1: true }, resources: [] };
context.input = plan;
vm.runInContext('load(input)', context);
assert.match(elements.get('tasks').innerHTML, /Primer paso/);
assert.match(elements.get('tasks').innerHTML, /&lt;script&gt;/);
assert.doesNotMatch(elements.get('tasks').innerHTML, /javascript:alert|<script>/);
assert.match(elements.get('count').textContent, /1 \/ 1/);

context.bad = { course: 'Bad', tasks: [{ id: 'x', title: 'Bad', start: '2026-10-15', end: '2026-10-12' }] };
assert.throws(() => vm.runInContext('load(bad)', context), /fechas no válidos/);
assert.equal(elements.get('course').textContent, 'Import test');
console.log('Passed: import, instructions, restored progress, unsafe markup/links and invalid dates.');
context.statusPlan = { course: 'Status test', tasks: [
 {id:'S1',title:'Todo',start:'2026-10-12',end:'2026-10-13'},
 {id:'S2',title:'Working',start:'2026-10-12',end:'2026-10-13'},
 {id:'S3',title:'Finished',start:'2026-10-12',end:'2026-10-13'},
 {id:'S4',title:'Uncertain',start:'2026-10-12',end:'2026-10-13',kind:'Configuración: confirmar'}
], progress: {S1:false,S2:'in_progress',S3:true} };
vm.runInContext('load(statusPlan)',context);
assert.equal(vm.runInContext('taskStatus(data.tasks[0])',context),'todo');
assert.equal(vm.runInContext('taskStatus(data.tasks[1])',context),'in_progress');
assert.equal(vm.runInContext('taskStatus(data.tasks[2])',context),'done');
assert.equal(vm.runInContext('taskStatus(data.tasks[3])',context),'to_confirm');
elements.get('status-filter').value='in_progress';
elements.get('status-filter').handlers.change();
assert.match(elements.get('tasks').innerHTML,/Working/);
assert.doesNotMatch(elements.get('tasks').innerHTML,/Finished|Uncertain|>Todo</);
vm.runInContext('progress.S2="to_confirm"; localStorage.setItem(storageKey,JSON.stringify(progress)); load({...statusPlan,progress:undefined})',context);
assert.equal(vm.runInContext('taskStatus(data.tasks[1])',context),'to_confirm');
console.log('Passed: four statuses, legacy booleans, state filter and storage reload.');
