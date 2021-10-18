import '../utils/types.js'

const createStore = () => {
    /**
     * @returns {Task[]}
     */
    const get = () => {
        const string = window.localStorage.getItem('items')
        const result = string ? JSON.parse(string) : [];
        return result;
    }

    /**
     * @param {Task[]} newStore
     */
    const set = (newStore) => {
        if (!newStore) throw new Error('No store to set was passed')
        const string = JSON.stringify(newStore)
        window.localStorage.setItem('items', string)
    }

    return {
        get,
        set,
    }
}

const createId = () => {
    const random = Math.floor(Math.random() * 10000)
    const timestamp = new Date().getTime();
    return `${timestamp}-${random}`
}


const store = createStore();

const createItems = () => {
    /**
     * @type {Task[]}
     */
    let data = store.get();

    /**
     * @returns {Task[]}
     */
    const get = () => store.get()

    /**
     * @param {string} title - The title of a new task to add
     */
    const add = (title) => {
        data.unshift({
            id: createId(),
            title,
            completed: false,
        })

        store.set(data)
        return data
    }

    /**
     * @param {string} id  - The ID of the task to remove
     */
    const remove = (id) => {
        data = data.filter(task => task.id !== id)
        store.set(data)
        return data
    }

    /**
     * @param {string} id - The ID of the task to toggle
     */
    const toggle = (id) => {
        data = data.map((task) => {
            if (task.id !== id) return task

            return {
                ...task,
                completed: !task.completed,
            }
        })

        store.set(data)
        return data
    }

    return {
        get,
        add,
        remove,
        toggle,
    }
}

export const items = createItems();
export default items