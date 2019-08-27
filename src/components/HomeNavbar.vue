<template>
  <div>
    <div class="header">
      <div class="wrap">
        <router-link class='link' to='/'>
          <h1>Game World</h1>
        </router-link>
        <ul>
          <router-link class='link' to='/admin/Products'>
            <li>後台</li>
          </router-link>
          
          <router-link  class='link' to='/cart'>
            <li>購物車</li>
          </router-link>
         
        </ul>
      </div>
      
    </div>
  </div>
</template>

<style>
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  *,*:before,*:after{
    box-sizing: border-box;
  }
  img{
    max-width: 100%;
    height: auto;
  }
  body{
    font-family: Microsoft JhengHei;
  }
  a{
    text-decoration: none;
  }
</style>

<style scoped>
/* .clearfix:after{ 
  content: "";
  display: block; 
  clear: both;
} */
.header{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
  background-color:#454f58;
  z-index: 10;
  /* box-shadow: 0px 5px 2px 2px #ECEAED; */
}
.header .wrap{
  display: flex;
  justify-content: space-between;
  max-width: 1024px;
  margin: auto;

}
.header h1{
  /* display: inline-block; */
  width: 200px;
  height: 50px;
  background-image: url(../img/default-monochrome-white.svg);
  background-size: 200px 50px;
  text-indent: 101%;
  white-space: nowrap;
  overflow: hidden;
  background-repeat: no-repeat;
  
}
.link:hover{
  text-decoration: none;
}
.header ul{
  display: flex;
  color: aliceblue;
  /* float: right; */
}
.header ul li{
  color: #fff;
  /* float: left; */
  font-size: 25px;
  line-height: 50px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 10px;
}
.header ul li:hover{
  cursor :pointer;
  background-color: #262b2f;
}

  
  

</style>
