export const html = (staticArray = [], ...dynamic) => {
    const array = (dynamic || []).map((singleDynamic, index) => {
        return `${staticArray[index] || ''}${singleDynamic || ''}`
    })

    const lastIndexStatic = staticArray.length - 1;
    return `${array.join('')}${staticArray[lastIndexStatic]}`;
}

/**
 * @typedef {object} Config 
 * @property {string} name
 */

/**
 * @typedef {object} Payload 
 * @property {string} id
 * @property {HTMLElement} element
 * @property {string} type
 */

/**
 * @template D
 * @param {Config} config 
 * @param {(dataset: object) => D} createData
 * @param {(data: D) => string} render
 * @param {(props: { data: D, dispatch: (name: string) => void, payload: Payload, update: (changes: Partial<D>) => void, event: Event<HTMLElement> }) => void} handler
 */
export const createComponent = (config, createData, render, handler) => {
    if (!config) throw Error('No config object passed')
    if (!config.name) throw Error('No name property inside config object')
    if (!config.name.includes('-')) throw Error('Name in config should include a hypen ("-")')

    if (!render) throw Error('No render callback supplied')
    createData = createData || (() => ({}))
    handler = handler || (() => {})

    const { name } = config

    class Component extends HTMLElement {
        shadow = this.attachShadow({ mode: 'closed' })
        data = createData(this.dataset)

        constructor() {
            super();
        }
        
        renderAndUpdate = (changes) => {
            const oldData = { ...this.data };

            const newData = {
                ...oldData,
                ...changes,
            }

            this.data = newData;
            this.renderWrapper()
        }

        handlerWrapper = (event) => {
            if (event.type === 'submit') {
                event.preventDefault();
            }

            handler({
                data: this.data,
                event,
                update: this.renderAndUpdate,
                dispatch: (name, detail) => this.dispatchEvent(new CustomEvent(
                    name, 
                    { 
                        bubbles: true,
                        detail: detail || {},
                    }
                )),
                payload: {
                    type: event.type,
                    element: event.target,
                    detail: event.detail,
                    id: event.target.getAttribute('data-app-id')
                }
            })
        }

        renderWrapper = () => {
            this.shadow.innerHTML = `
                <style>
                    * { box-sizing: border-box }
                </style>    
                ${render(this.data)}
            `
        }

        connectedCallback() {
            const { listeners = [] } = config
            this.renderWrapper()

            listeners.forEach(listenerType => {
                this.shadow.addEventListener(listenerType, this.handlerWrapper)
            })
        }

        disconnectedCallback() {
            const { listeners = [] } = config
            listeners.forEach(listenerType => {
                this.shadow.removeEventListener(listenerType, this.handlerWrapper)
            })
        }
    }

    window.customElements.define(name, Component)
}

export default createComponent
