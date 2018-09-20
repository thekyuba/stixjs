/**
 * Make object props reactive using getters and setters
 * Keep track of DOM nodes with reactive props
 * and trigger interpolation whenever a change is made to those props
 * @param {Object} data
 */
function ReactiveData (data) {
    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            let privateProp = data[prop];

            Object.defineProperty(this, prop, {
                get: () => {
                    return privateProp;
                },
                set: (val) => {
                    privateProp = val;
                    this.interpolateSingleProp(prop);
                }
            });
        }
    }

    this.nodes = {};

    this.assignNodeToProp = function (node, propName) {
        this.nodes[propName] = this.nodes[propName] || [];
        this.nodes[propName].push(node);
    };

    /**
     *
     * @param {DOM node} clone
     * @returns {String}
     */
    this.findInterpolation = function (clone) {
        const preparedClone = _removeChildren(clone);
        const ownProps = Object.getOwnPropertyNames(this);
        const template = preparedClone.innerHTML;
        const propName = ownProps.find((prop) => template.includes(prop));

        return propName;
    };

    this.interpolateSingleProp = function (prop) {
        this.nodes[prop].map((node) => {
            Array.from(node.childNodes).map((childNode) => {
                // cache template only on initial interpolation
                // this step is needed to keep track of props in curly braces
                if (!childNode.cachedNodeValue) {
                    childNode.cachedNodeValue = childNode.nodeValue;
                }

                // exclude DOM nodes
                // interpolate only text nodes with value
                if (!childNode.children && !_isAllWhitespace(childNode)) {
                    childNode.nodeValue = _interpolate.call(this, childNode.cachedNodeValue);
                }
            });
        });
    };

    this.interpolateAllProps = function () {
        for (const prop in this.nodes) {
            if (this.nodes.hasOwnProperty(prop)) {
                this.interpolateSingleProp(prop);
            }
        }
    };

    function _isAllWhitespace (node) {
        return !(/[^\t\n\r ]/.test(node.textContent));
    }

    /**
     * @param {String} template
     */
    function _interpolate (template) {
        if (template) {
            return template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, submatch) => {
                return this[submatch] || '';
            });
        }

        return null;
    }

    function _removeChildren (node) {
        const clonedNode = node.cloneNode(true);

        while (clonedNode.firstElementChild) {
            clonedNode.removeChild(clonedNode.firstElementChild);
        }

        return clonedNode;
    }
}

export {
    ReactiveData
};
