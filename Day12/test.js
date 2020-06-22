
function test() {
    const backgroundColor = ["red", "blue", "yellow", 'black'];

    backgroundColor.forEach(element => {
        const block = document.createElement('div');
        block.style.width = "50px";
        block.style.height = "50px";
        document.body.appendChild(block);
        block.style.backgroundColor = element;
        // const block = `
        //     <div class="xxx">
        //         <span>${element}</span>
        //     <div>`
        // document.body.innerHTML += block;
    });
}


