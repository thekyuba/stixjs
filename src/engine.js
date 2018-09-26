/**
 * Make object props reactive using getters and setters
 * Keep track of DOM nodes with reactive props
 * and trigger interpolation whenever a change is made to those props
 * @param {Object} data
 */
function Binding (config) {
    let privateValue = config.object[config.property];

    this.elementBindings = [];

    this.valueGetter = () => {
        return privateValue;
    };

    this.valueSetter = (val) => {
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
    this.addBinding = (element, attribute, customEvent) => {
        const binding = {
            element,
            attribute
        };

        if (customEvent) {
            element.addEventListener(customEvent, () => {
                this.valueSetter(element[attribute]);
            });
            binding.event = customEvent;
        }
        this.elementBindings.push(binding);
        /**
         * TODO:
         * Refactor this method so that it knows it has to replace nodeValue in text nodes,
         * value in inputs etc.
         * Make usf of the attribute variable?
         */
        //element[attribute] = privateValue;
        this.syncViewModel(element, attribute);
        return this;
    };

    this.syncViewModel = (element, attr) => {
        switch (element.nodeName) {
        case 'INPUT':
            element[attr] = privateValue;
            break;
        default:
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
            break;
        }
    };

    Object.defineProperty(config.object, config.property, {
        get: this.valueGetter,
        set: this.valueSetter
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
