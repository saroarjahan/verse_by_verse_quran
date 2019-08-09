//This is the main js which  written in vue.js format. In addtion, 
//I have used howller.js to controll sound
var app = new Vue({
   el: '#app',
    data: {
    audioUrl:'./verses/',
    urlnot:null,
    id:null,
    tests:null,
    delay:0,
    startAyat:0,
    endAyat:0,
    url:0,
    message:'',
    playShow:true,
    pauseShow:false,
    resumeShow:false,
    range:'',
    list:[],
    sound:null,
    playing:'',
    text:'',
    startShow:false,
    last:'',
    isActive:false,
   },

   methods: {
    playSurah(st,en){//when play button got clicked this fucntion trigger, two argument passed start ayat and end ayat
        this.url=0;
        this.url= ('000' + parseInt(this.range.split('.', 2)[0])).substr(-3);
        this.audioUrl='./verses/'+this.url+this.startAyat+'.mp3'; 
        app.delay=0;
        var en= parseInt(en);
        var i = parseInt(st); 

        if (this.id !==null) {
          app.sound.stop(app.id);
          this.list=[];
        }

        function f(){
          for (i ; i <=en ; i++) {
            var ayat=('000'+ parseInt(i.toString())).substr(-3);
            if(i==0){
              app.audioUrl='./verses/'+'001'+'000'+'.mp3';
            }
            else{
              app.audioUrl='./verses/'+app.url+ayat+'.mp3';
            }
            
            app.list.push(app.audioUrl);
            i=+i;
          
          }
        }
          
        if (i <= en && this.url!==0 && en!==0 && this.last >= en && this.last >=st  && st>=0) {
          //condition for the range of ayat, only f() be called after right range of ayat
          f();
          autoplay(0, app.list); 
          this.pauseShow=true;
          this.resumeShow=false;
          this.message="";
          this.startShow=true;
        }else{
          this.message="Ayat Range "+'0'+'-'+this.last;
          this.pauseShow=false;
          this.resumeShow=false;
        }    
    },

    audioandUrl(range){
    //     this.url=0;
    //     this.url= ('000' + parseInt(this.range.split('.', 2)[0])).substr(-3);
    //     this.audioUrl='./verses/'+this.url+this.startAyat+'.mp3';       
    },

    onChange(){
      // this.endAyat= ('000' + parseInt(this.range.toString().substring(1))).substr(-3);
      // this.range.toString().split('.').pop();
      this.range=this.range.toString();
      this.startAyat = 0;
      this.endAyat = this.range.split('.', 2)[1]; 
      this.endAyat = parseInt(this.endAyat.substring(0, this.endAyat.length - 1));
      this.last=this.endAyat;
    },

    urlUpdate(x, range) {
    //     this.startAyat=('000'+ parseInt(x.toString())).substr(-3);
    //     this.audioUrl='./verses/'+this.url+this.startAyat+'.mp3';             
    },

    pas(){
      app.sound.pause(app.id);
      this.pauseShow=false;
      this.resumeShow=true;
    },

    play(){
      app.sound.play(app.id);
      this.pauseShow=true;
      this.resumeShow=false;
    },
    modal(){
      this.isActive=true;
    },
    close(){
      this.isActive=false;
    },

   },
 });

//Play Surah loop
function autoplay(i, list) {
    app.sound = new Howl({
        src: [app.list[i]],

        // preload: true,
        onend: function () {
            if ((i + 1) == list.length) {
                autoplay(0, list)
            } else {
                autoplay(i + 1, list)
            }
        }
    })
    app.id=app.sound.play();
    var name=parseInt(app.list[i].substr(9).slice(0,3));
    var ayat=parseInt(app.list[i].substr(12).slice(0, -4));
    app.text='./text/'+name+'_'+ayat+'.gif';
    app.playing=parseInt(app.list[i].substr(12).slice(0, -4));
}
