const form = document.querySelector('#fetchForm');
form.addEventListener('submit', async function (ev) {
    ev.preventDefault();
    deleteImgs()

    console.dir(form)
    const userinp = form.elements.qry.value;    //saving the user input as a variable

    const addquery = { params: { q: userinp } }     //Will add "?q=userinp" at the end of the url. 
    const resp = await axios.get(`https://api.tvmaze.com/search/shows`, addquery)    //Using existing API. Sending request with input data as query and awaiting it (catching the response)
    console.dir(resp)
    addImgs(resp.data)

    form.elements.qry.value = '';
})

const addImgs = function (imgs) {
    for (let i of imgs) {
        if (i.show.image) {     //We ignore the shows that do not have any image source
            const medimg = document.createElement('img')
            medimg.src = i.show.image.medium     //Adding the image srcs, one at a time from the array
            document.body.append(medimg)
        }
    }
}

const deleteImgs = () => {
    const imags = document.querySelectorAll('img');  //Gives an array of all image elements
    for (let i = 0; i < imags.length; i++) {
        imags[i].remove();
    }

}
