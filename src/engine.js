/**
 * Make object props reactive using getters and setters
 * Keep track of DOM nodes with reactive props
 * and trigger interpolation whenever a change is made to those props
 * @param {Object} data
 */
function Binding (config) {
    let privateValue = config.object[config.property];

    this.elementBindings = [];

    this.getter = () => {
        return privateValue;
    };

    this.setter = (val) => {
        privateValue = val;
        for (let i = 0; i < this.elementBindings.length; i++) {
            const binding = this.elementBindings[i];

            this.syncViewModel(binding.element, binding.attribute);
        }
    };

    /**
     * Bind property to DOM element
     * attribute and customEvent are only used for two-way biding
     * @param {DOM node} element
     * @param {String} attribute
     * @param {String} customEvent
     */
    this.addBinding = (bindingOpts) => {
        const { element, attribute, customEvent } = bindingOpts;

        const binding = {
            element,
            attribute
        };

        if (customEvent) {
            element.addEventListener(customEvent, () => {
                this.setter(element[attribute]);
            });
            binding.event = customEvent;
        }
        this.elementBindings.push(binding);

        this.syncViewModel(element, attribute);
    };

    /**
     * @param {DOM Object} element
     * @param {String} attr // only passed for two-way data biding
     */
    this.syncViewModel = (element, attr) => {
        if (attr) {
            element[attr] = privateValue;
        } else {
            Array.from(element.childNodes).map((childNode) => {
                // cache template only on initial interpolation
                // this step is needed to keep track of props in curly braces
                if (!childNode.cachedNodeValue) {
                    childNode.cachedNodeValue = childNode.nodeValue;
                }

                // exclude DOM nodes
                // interpolate only text nodes with value
                if (!childNode.children) {
                    childNode.nodeValue = _interpolate(childNode.cachedNodeValue, config.object);
                }
            });
        }
    };

    Object.defineProperty(config.object, config.property, {
        get: this.getter,
        set: this.setter
    });

    config.object[config.property] = privateValue;
}

function _interpolate (template, obj) {
    if (template) {
        return template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, submatch) => {
            return obj[submatch] || '';
        });
    }

    return null;
}

export {
    Binding
};
