import './components/task-item.js'
import './components/todo-app.js'
import './components/add-item.js'

if ('serviceWorker' in window.navigator) {
    window.navigator.serviceWorker.register('/service-worker.js')
}