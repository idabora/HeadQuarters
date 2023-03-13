$('document').ready(()=>{
    
    $.get("/api/posts", results=>{
        // console.log(results);

        outputPosts(results,$(".postcontainer"));

    } )
})


function outputPosts(results,container)
{
    container.html("");


    results.forEach((result)=>{
        var html= createPosthtml(result);
        container.append(html);
        console.log("3");

    })
    console.log("4");

    if(results.length==0)
    {
        container.append('<span>Bored ? then Post Something </span>');
    }

}



