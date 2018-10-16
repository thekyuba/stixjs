# stixjs
:exclamation: This is a work in progress

My attempt at writing a simple user interface library / mini-framework inspired mainly by Vue.js.

## Features
- interpolation
- one-way data biding
- two-way data biding
- lifecycle hooks

## Try it out
1. Include ```stix.js``` from ```dist``` folder.
2. Create a new instance of ```Stix``` passing in a root node and a config object as parameters.

Exemplary config that uses most of the features can look something like this:

Markup:
```html
<body>
    <!-- Stix needs a root node where it will be bootstrapped -->
    <div id="app"></div>

    <!-- Scripts -->
    <script src="./stix.js"></script>
    <script src="./myScript.js"></script>
</body>
```

JS:
```js
const stixInstance = new Stix(document.getElementById('app'), {
    data: {
        myName: 'Rob',
        myAge: 30
    },
    template: `
        <div> 
            <h2>
                <span>Hello world, my name is: {{ myName }} </span>
                <span>and I'm {{ myAge }} years old </span>
            </h2>
            Use this input to set the age:
            <input type="text" value="{{ myAge }}">
        </div>
    `,
    // At this point data is reactive
    // but hasn't been interpolated yet
    beforeMounted () {
        this.data.myName = "Matt";
    },
    // View and model are binded
    onMounted () {
        setTimeout(() => {
            this.data.myName = 'Gniewomir';
        }, 2000);

        setTimeout(() => {
            this.data.myAge = 50;
        }, 4000);
    }
});
```