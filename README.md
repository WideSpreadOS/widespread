# WideSpread
A new way to internet.


        <a-sky src="/image/<%= user.user_vr_background_image %>"></a-sky>

<!-- POSTS -->
<% let postStartingPoint = 0 %>
<a-entity id="postContainer" position="-2.5 2.75 -2.5" rotation="0 90 0" scale="1 1 1">
    <a-text value="Your Posts" color="lightskyblue" position="-2.5 1 0" align="center"></a-text>
    <% posts.forEach(function(post) { %>
        <a-entity position="<%- postStartingPoint-- %> 0 0" scale="1 1 1">
            <a-entity class="post-container" scale="0.9 0.9 0.9" geometry="primitive: plane" height="3" material="metalness: 0.5; opacity: 0.8; color: lightskyblue">
                <a-text width="0.9" value="<%= post.postBody %>" wrap-count="20" height="0.9" color="#fff" position="0 0 0.010" scale="1 0.5 1" align="center" line-height="60"></a-text>    
            </a-entity>
        </a-entity>
    <% }) %>
</a-entity>


<!-- FRIENDS -->
<% let friendStartingPoint = 0 %>
<a-entity transparent="false" position="-2 1 0" rotation="0 90 0" geometry="primitive: plane" material="shader: html; target: #friendContainer" opacity="0.5"></a-entity>










<!--
<a-entity position="-2.5 1.5 -3" rotation="0 90 0" scale="1 1 1">
    <a-text value="Your Friends" color="lightskyblue" position="-3 1 0" align="center"></a-text>
    <% user.friends.forEach(function(friend) { %>
        <a-entity position="<%- friendStartingPoint-- %> 0 0" geometry="primitive: plane" height="3" material="metalness: 0.5; opacity: 0.5; color: <%= friend.favColor1 %>">
            
            <a-image src="/image/<%= friend.user_avatar %>" position="0 0 0.01" width="0.9" height="0.9"></a-image>
            <a-text value="<%= friend.fname %> <%= friend.lname %>" position="0 1 0" scale="0.9 0.9 0.1" color="<%= friend.favColor1 %>" align="center" ></a-text>
            <a-text value="<%= friend.fname %> <%= friend.lname %>" position="0 1 0" scale="1 1 0.1" color="#fff" opacity="0.5" align="center" zOffset="0" height="0" width="4.5"></a-text>






        </a-entity>
             <a-entity position="<%- friendStartingPoint-- %> 0 0" geometry="primitive: plane" height="3" material="metalness: 0.5; opacity: 0.8; color: <%= friend.favColor1 %>">
            <% if (!friend.user_avatar) { %>
                <a-link position="0 0 0.1" scale="0.2 0.2 0.2" href="/users/profile/<%= friend.id %>" title="<%= friend.fname %> <%= friend.lname %>" image="/images/system/default-user-avatar_1a1a1a.png"></a-link>
            <% } else { %>
            <a-link position="0 0 0.1" scale="0.2  0.2  0.2 " href="/users/profile/<%= friend.id %>" title="<%= friend.fname %> <%= friend.lname %>" image="/image/<%= friend.user_avatar %>"></a-link>
            <% } %>
        </a-entity> 
        <% }) %>
    </a-entity>
-->



<!-- PHOTOS -->
<% let photoStartingPoint = 0 %>
<a-entity position="-2 1.5 -4" rotation="0 0 0">
    <a-text value="Your Photos" color="lightskyblue" position="2 1 0" align="center"></a-text>
    <% userPhotos.forEach(function(photo) { %>
        <a-entity position="<%- photoStartingPoint++ %> 0 0">
            <a-image height="0.9" width="0.9" src="/image/<%= photo.img.data %>"></a-image>
        </a-entity>
    <% }) %>
</a-entity>




<!-- MOVIES -->
<% let movieStartingPoint = 0 %>
<a-entity position="4 2.5 -4" rotation="0 -90 0">
    <a-text value="Your Movies" color="lightskyblue" position="0 1 0" align="center"></a-text>
    <% currentUser.movie_list.forEach(function(movie) { %>
        <a-entity position="<%- movieStartingPoint++ %> 0 0">
                <a-link href="/entertainment/vr/movies/<%= movie.movie_link %>" title="<%= movie.movie_name %>" peekmode="true" position="0 -1 0.1" scale="0.3 0.3 0.3" image="<%= movie.movie_poster %>" color="lightskyblue" geometry="primitive: circle; radius: 0.7; segments: 64" material="shader: portal; pano: <%= movie.movie_poster %>; side: double; opacity: 0.65; backgroundColor: #000; strokeColor: lightskyblue" link="backgroundColor: #000; borderColor: lightskyblue; highlightedColor: #fff; titleColor: lightskyblue"><a-entity text="color: white; align: center; font: kelsonsans; value: <%= movie.movie_name %>; width: 5" position="0 1.5 0" rotation="0 180 0"></a-entity><a-entity geometry="primitive: sphere; segmentsWidth: 64; segmentsHeight: 64; phiLength: 180; thetaLength: 360" material="shader: portal; borderEnabled: 0; pano: <%= movie.movie_poster %>; side: back" rotation="0 180 0" position="" visible="false"></a-entity><a-entity geometry="primitive: sphere; radius: 10; segmentsWidth: 64; segmentsHeight: 64" material="shader: portal; borderEnabled: 0; pano: <%= movie.movie_poster %>; side: back" visible="false"></a-entity></a-link>
                <a-image src="<%= movie.movie_poster %>" position="0 -0.4 0"></a-image>
        </a-entity>
    <% }) %>
</a-entity>




<!-- BACKGROUND -->
<% if (!currentUser.user_vr_background_image) { %>
    <a-sky src="/images/system/vr/sky/space_1.jpg"></a-sky>
    <% } else { %>
        <a-sky src="/images/system/vr/sky/space_1.jpg"></a-sky>
        
<% } %>















<div style="width: 100%; height: 100%; position: fixed; left: 0; top: 0; z-index: -100; overflow: hidden">
    <div id="friendContainer"
        style="background: rgba(135, 206, 250, 1); backdrop-filter: blur(4px); border-radius: 16px; box-shadow: 0 0 30px #fff; color: #333; font-size: 48px">
        <% user.friends.forEach(function(friend) { %>
            <div class="friend" style="margin-bottom: 20px; text-align: center; color: #fff; ">
                <p>
                    <%= friend.fname %>
                        <%= friend.lname %>
                </p>
                <p><a href="#<%= friend.fname %>">Link</a></p>
                <input type="text" name="" id="" placeholder="Write a message...">
            </div>
            <% }) %>
    </div>
</div>



<div style="width: 100%; height: 100%; position: fixed; left: 0; top: 0; z-index: -1; overflow: hidden; background: #000;"></div>
<script>
    
    AFRAME.registerComponent('log', {
            init: function () {
                console.log('Hello, World!');
            }
        });




        const postContainer = document.getElementById('postContainer')
        const allPosts = postContainer.querySelectorAll('.post-container')
        allPosts.forEach(postEl => {

            console.log(postEl)
            postEl.addEventListener('click', function (e) {
                const postData = postEl.querySelector('a-text')
                const postColor = postEl.getAttribute('material')
                const backgroundColor = postColor["color"]
                console.log(backgroundColor)
                if (backgroundColor == "lightskyblue") {
                    postEl.setAttribute('material', 'color', 'black');
                } else {
                    postEl.setAttribute('material', 'color', 'lightskyblue');
                }
                console.log(postColor)
            })
        })
</script>

<script>
    const htmlEl = document.getElementById('htmlElement')
    console.log(htmlEl)
</script>


## Welcome

-----


### What is WideSpread?
-----

### How do I use WideSpread?
-----

### What is SpreadShield?
-----

### What is FlexFloor?
-----




### Notes

##### EJS Snippets


    <a class="<%= pageTitle == 'Dashboard' ? 'menu-item active' : 'menu-item' %>"></a>



    


    

