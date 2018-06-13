/**
 * Library constructor 
 * @param {node} rootNode 
 * @param {object} config
 *  
 * examplary config:
 * data: {name: 'Jacob'}
 * template: <div>Hello World</div>
 *  
 */
function Stix (rootNode, config) {
    const self = this;

    this.rootNode = rootNode;
    this.template = config.template;
    this.data = _setData(config.data);


    this.render = function () {
        const interpolatedTemplate = _interpolate(this.template, this.data);

        this.rootNode.innerHTML = interpolatedTemplate;
    }

    /** Lifecycle */
    this.render();

    ////////////////////////
    function _interpolate (template, options) {
        return template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, submatch) => {
            return options[submatch] || ''
        })
    }

    function _setData (data) {
        const reactiveData = new ReactiveObject(data);

        return reactiveData;
    }

    function ReactiveObject(data) {
        for (prop in data) {
            let privateProp = data[prop];
    
            Object.defineProperty(this, prop, {
                get: function () {
                    return privateProp;
                },
                set: function (val) {
                    privateProp = val;
                    self.render();
                }
            });
        }
    }
    
}
