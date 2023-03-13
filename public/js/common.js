$("#posttextarea").keyup((evnt) => {

    var textinput = $(evnt.target);

    var text = textinput.val().trim();
    // text=text.trim();
    console.log(text);

    var submitbutton = $("#submitPostButton");

    if (submitbutton == 0) return alert("No submit button found");

    if (text == "") {
        submitbutton.prop("disabled", true);
        return;
    }

    submitbutton.prop("disabled", false);

})

$("#submitPostButton").click((evnt) => {

    var submitbutton = $(evnt.target);
    var text = $("#posttextarea");

    var data = {
        // content:text
        content: text.val()
    }

    $.post("/api/posts", data, (postdata) => {
        // alert(postdata);
        console.log(postdata);

        var html = createPosthtml(postdata);
        $(".postcontainer").prepend(html);
        text.val("");
        submitbutton.prop("disabled", true);


    })
})
$(document).on('click',".like",(event)=>{
        var button=$(event.target);
        var postId=getPostId(button);
        // console.log(postid);
        if(postId===undefined) return;
        $.ajax({
            url:`/api/posts/${postId}/like`,
            type:"PUT",
            success:(postdata)=>{
                // console.log(postdata.likes.length);
                button.find('span').text(postdata.likes.length || "")
            },
            error:(error)=>{
                console.log(`error  ${error}`);
            }
    
        })
    
})

$(document).on('click',".retweet",(event)=>{
    var button=$(event.target);
    var postId=getPostId(button);
    // console.log(postid);
    if(postId===undefined) return;
    $.ajax({
        url:`/api/posts/${postId}/retweet`,
        type:"POST",
        success:(postdata)=>{
        //    console.log(postdata);
        button.find('span').text(postdata.retweetUsers.length || "")

        },
        error:(error)=>{
            console.log(`error  ${error}`);
        }

    })

})

$(document).on('click',".posted",(event)=>{
    var element=$(event.target);
    var postId=getPostId(element);
    console.log("reached");
    if(postId !== undefined && !element.is('button'))
    {
        console.log("reachdasded");
        window.location.href="/posts/"+ postId;
      
    }
})

function getPostId(element){

    var isRoot=element.hasClass('posted');
    var rootElement= isRoot==true ? element : element.closest('.posted');
    // console.log(rootElement);
    var postId=rootElement.data().id;

    if(postId===undefined) return alert("Post doesn't exist");

    return postId;
}

function createPosthtml(postdata) {

    if(postdata == null) return alert('post object is null');

    var isRetweet=postdata.retweetData !== undefined;
    var retweetedBy=isRetweet? postdata.postedBy.Name:null;
    postdata=isRetweet?postdata.retweetData:postdata;
    console.log(isRetweet);

    var postedBy = postdata.postedBy;
    if(postedBy._id===undefined)
    {
        return console.log("user object not populated");
    }
    var displayName = postedBy.Name;
    var timestamp = timeDifference(new Date(), new Date(postdata.createdAt));

    var retweetText="";
    if(isRetweet){
        retweetText=`<span>
        <i class="fa-solid fa-retweet"></i> 
        Retweeted By <a href='/profile/${retweetedBy}'> @${retweetedBy}</a>
        </span>`
    }


    return `<div class='posted' data-id='${postdata._id}' >
        <div class='postActionContainer'>
            ${retweetText}
        </div>
        <div class='maincontentcontainer'>
            <div class='imagecontainer'>
                <img src='${postedBy.Profile_pic}' class='profilepic'></img>
            </div>
            <div class='postedcontentcontainer' >
                <div class='header'>
                    <a  class='Name' href='/profile/${postedBy.Name}'>
                        ${displayName}
                    </a>
                    <span class='username'> 
                        @${postedBy.Name} 
                    </span>
                    <span class='date'> 
                        ${timestamp} 
                    </span>
                </div>
                <div class='postbody'>
                    ${postdata.content}
                </div>
                <div class='footer'>
                        <div class='reactbtns'>
                            <button class='like'> 
                                <i class="fa-regular fa-heart"></i> 
                                <span>${postdata.likes.length || ""} </span>
                            </button> 
                        </div>
                        <div class='reactbtns'> 
                            <button  data-toggle='modal' data-target='#replyModal'>  
                                <i class="fa-regular fa-comment"></i> 
                            </button> 
                        </div>
                       <div class='reactbtns'> 
                            <button class='retweet'> 
                                <i class="fa-solid fa-retweet"></i> 
                                <span>${postdata.retweetUsers.length || ""} </span>
                            </button> 
                        </div>
                </div>
            </div>
        </div>
    </div>`

    // return postdata.content;
}


function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if(elapsed/1000 <30) return "Just Now"

         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return  Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
