# WideSpread
A new way to internet.


        <a-sky src="/image/<%= user.user_vr_background_image %>"></a-sky>


        <% userPhotos.forEach(function(photo) { %>
            <a-entity position="<%- photo1StartingPoint++ %> 0 0">
                <a-image height="0.9" width="0.9" src="/image/<%= photo.img.data %>"></a-image>
            </a-entity>
        <% }) %>









<a-link href="/entertainment/vr/movies/Airplane!" title="Airplane!" peekmode="true" position="0 -1.39483 0.1" scale="0.03 0.03 0.001" image="https://m.media-amazon.com/images/M/MV5BZjA3YjdhMWEtYjc2Ni00YzVlLWI0MTUtMGZmNTJjNmU0Yzk2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" color="lightskyblue" geometry="primitive: circle; radius: 20; segments: 100" material="shader: portal; pano: https://m.media-amazon.com/images/M/MV5BZjA3YjdhMWEtYjc2Ni00YzVlLWI0MTUtMGZmNTJjNmU0Yzk2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg; side: double; opacity: 0.65; backgroundColor: #000; strokeColor: lightskyblue" link="backgroundColor: #000; borderColor: lightskyblue; highlightedColor: #fff; titleColor: lightskyblue">
                                <a-entity text="color: white; align: center; font: kelsonsans; value: Airplane!; width: 5" position="0 1.5 0" rotation="0 180 0"></a-entity>
                                <a-entity geometry="primitive: sphere; segmentsWidth: 64; segmentsHeight: 64; phiLength: 180; thetaLength: 360" material="shader: portal; borderEnabled: 0; pano: https://m.media-amazon.com/images/M/MV5BZjA3YjdhMWEtYjc2Ni00YzVlLWI0MTUtMGZmNTJjNmU0Yzk2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg; side: back" rotation="0 180 0" position="" visible="false"></a-entity>
                                <a-entity geometry="primitive: sphere; radius: 10; segmentsWidth: 64; segmentsHeight: 64" material="shader: portal; borderEnabled: 0; pano: https://m.media-amazon.com/images/M/MV5BZjA3YjdhMWEtYjc2Ni00YzVlLWI0MTUtMGZmNTJjNmU0Yzk2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg; side: back" visible="false"></a-entity>
                            <a-entity text="color: lightskyblue; align: center; font: kelsonsans; value: Airplane!; width: 5" position="0 1.5 0" rotation="0 180 0"></a-entity><a-entity geometry="primitive: sphere; segmentsWidth: 64; segmentsHeight: 64; phiLength: 180; thetaLength: 360" material="shader: portal; borderEnabled: 0; pano: https://m.media-amazon.com/images/M/MV5BZjA3YjdhMWEtYjc2Ni00YzVlLWI0MTUtMGZmNTJjNmU0Yzk2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg; side: back" rotation="0 180 0" position="" visible="false"></a-entity><a-entity geometry="primitive: sphere; radius: 10; segmentsWidth: 64; segmentsHeight: 64" material="shader: portal; borderEnabled: 0; pano: https://m.media-amazon.com/images/M/MV5BZjA3YjdhMWEtYjc2Ni00YzVlLWI0MTUtMGZmNTJjNmU0Yzk2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg; side: back" visible="false"></a-entity></a-link>
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



    


    

