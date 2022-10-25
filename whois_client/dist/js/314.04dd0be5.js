"use strict";(self["webpackChunkwhois_client"]=self["webpackChunkwhois_client"]||[]).push([[314],{1397:function(e,s,t){t.d(s,{Z:function(){return _}});var l=t(3396),a=t(7139);const n={class:"HeaderChild"},i=["src"];function d(e,s,d,o,r,h){const w=(0,l.up)("UserDomains"),u=(0,l.up)("AuthForm");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",null,[r.userStatus?((0,l.wg)(),(0,l.j4)(w,{key:0,userEmail:e.userEmail,class:"btnMainbtn",onPushDomain:s[0]||(s[0]=e=>this.domainName=e)},null,8,["userEmail"])):(0,l.kq)("",!0)]),(0,l._)("div",n,[(0,l._)("div",null,[(0,l._)("img",{src:t(6226),alt:"not found"},null,8,i)]),(0,l._)("p",{onClick:s[1]||(s[1]=s=>e.$router.push("/"))},"Home"),(0,l._)("p",{onClick:s[2]||(s[2]=s=>e.$router.push("whois")),class:(0,a.C_)({activHeader:"whois"==d.HeaderPos})},"Whois",2),(0,l._)("p",{onClick:s[3]||(s[3]=s=>e.$router.push("analiz")),class:(0,a.C_)({activHeader:"analiz"==d.HeaderPos})},"Analysis",2),(0,l._)("p",{onClick:s[4]||(s[4]=s=>e.$router.push("news")),class:(0,a.C_)({activHeader:"news"==d.HeaderPos})},"News",2),(0,l.Wm)(u,{ModView:"Child"})])],64)}var o=t(7964);const r={},h=r;var w=h,u={name:"MainHeader",props:{HeaderPos:{type:String,default:""}},components:{UserDomains:w,AuthForm:o.Z},data(){return{authForm:!1,userStatus:!1}}},c=t(89);const N=(0,c.Z)(u,[["render",d],["__scopeId","data-v-8e06e4ce"]]);var _=N},8971:function(e,s,t){t.r(s),t.d(s,{default:function(){return z}});var l=t(3396),a=t(7139);const n={class:"card"},i={style:{display:"flex","justify-content":"space-between"}},d={style:{display:"flex","justify-content":"space-between"}},o={key:0},r=["onClick"],h={key:0,class:"TextMore"},w={class:"NavigationNews"};function u(e,s,t,u,c,N){const _=(0,l.up)("Admin"),A=(0,l.up)("MainHeader"),C=(0,l.up)("AlertMessages");return(0,l.wg)(),(0,l.iD)(l.HY,null,["admin"==c.Role?((0,l.wg)(),(0,l.j4)(_,{key:0})):(0,l.kq)("",!0),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(c.ArrNews,((e,s)=>((0,l.wg)(),(0,l.iD)("div",{class:"newsAll",key:s},[(0,l._)("div",n,[(0,l._)("div",i,[(0,l._)("h3",null,(0,a.zw)(e.title),1),(0,l._)("h5",null,(0,a.zw)(e.updatedAt.split("T")[0]),1)]),(0,l._)("div",d,[c.ShowText&&c.ShowTextKey==s?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("p",o,(0,a.zw)(e.preview)+"...",1)),c.ShowText&&c.ShowTextKey==s?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("span",{key:1,onClick:e=>N.ReadMore(s)},"Read More",8,r))]),c.ShowText&&c.ShowTextKey==s?((0,l.wg)(),(0,l.iD)("div",h,(0,a.zw)(c.Text),1)):(0,l.kq)("",!0)])])))),128)),(0,l._)("table",w,[(0,l._)("td",{onClick:s[0]||(s[0]=e=>N.GoPageNews(-2))}," << "),(0,l._)("td",{onClick:s[1]||(s[1]=e=>N.GoPageNews(-1))}," < "),(0,l._)("td",null,(0,a.zw)(c.PageNews),1),(0,l._)("td",{onClick:s[2]||(s[2]=e=>N.GoPageNews(1))}," > "),(0,l._)("td",{onClick:s[3]||(s[3]=e=>N.GoPageNews(2))}," >> ")]),(0,l.Wm)(A,{HeaderPos:"news"}),(0,l.Wm)(C,{ref:"AddAlertMess"},null,512)],64)}var c=t(1397),N=t(2681),_=t(8635),A=t(9242);const C=e=>((0,l.dD)("data-v-6434e0dc"),e=e(),(0,l.Cn)(),e),g={style:{display:"flex","justify-content":"space-between"}},U={class:"AdminURL"},m={class:"ShowUsersBlock"},p=C((()=>(0,l._)("tr",null,[(0,l._)("td",null,"ID"),(0,l._)("td",null,"Title"),(0,l._)("td",null,"Update"),(0,l._)("td",null,"Delete")],-1))),k=["onClick"],P=["onClick"],S={class:"AddNewsBlock"},T={class:"NavigationUsers"},x={class:"AddNewsBlock"},M={class:"ShowUsersBlock"},v=C((()=>(0,l._)("tr",null,[(0,l._)("td",null,"ID"),(0,l._)("td",null,"Name"),(0,l._)("td",null,"Email"),(0,l._)("td",null,"Role"),(0,l._)("td",null,"Delete")],-1))),y=["onClick"],f=["onClick"],D={class:"NavigationUsers"};function G(e,s,t,n,i,d){const o=(0,l.up)("AlertMessages");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",g,[(0,l._)("div",null,[(0,l._)("button",{onClick:s[0]||(s[0]=e=>{this.ShowUsers=!this.ShowUsers,d.ShowUsersClick()}),class:"AddNewsBtn"},"Show Users"),(0,l._)("button",{onClick:s[1]||(s[1]=e=>i.ShowAddNews=!i.ShowAddNews),class:"AddNewsBtn"},"Add News"),(0,l._)("button",{onClick:s[2]||(s[2]=e=>{i.ShowChangeNews=!i.ShowChangeNews,d.ShowNewsClick()}),class:"AddNewsBtn"},"Chage News")]),(0,l._)("div",U,[(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":s[3]||(s[3]=e=>i.URLdomain=e),type:"text",placeholder:"URL to download domains",class:"input-line"},null,512),[[A.nr,i.URLdomain]]),(0,l._)("button",{onClick:s[4]||(s[4]=(...e)=>d.SaveURL&&d.SaveURL(...e))},"Save")])]),(0,l.wy)((0,l._)("div",m,[(0,l._)("table",null,[p,((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(i.ArrNews,((e,s)=>((0,l.wg)(),(0,l.iD)("tr",{key:s},[(0,l._)("td",null,[(0,l._)("label",null,(0,a.zw)(e.news_id),1)]),(0,l._)("td",null,[(0,l._)("label",null,(0,a.zw)(e.title),1)]),(0,l._)("td",null,[(0,l._)("p",{onClick:e=>{d.ChangeNews(s),i.UpdateNewsShow=!0},class:"UpdateNews"},"Update",8,k)]),(0,l._)("td",null,[(0,l._)("p",{onClick:e=>d.DeleteNews(s),class:"DeleteNews"},"Delete",8,P)])])))),128))]),(0,l.wy)((0,l._)("div",S,[(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":s[5]||(s[5]=e=>i.Title=e),type:"text",placeholder:"Title"},null,512),[[A.nr,i.Title]]),(0,l.wy)((0,l._)("textarea",{"onUpdate:modelValue":s[6]||(s[6]=e=>i.Text=e),type:"text",placeholder:"Text"},null,512),[[A.nr,i.Text]]),(0,l._)("button",{style:{right:"1vw"},onClick:s[7]||(s[7]=(...e)=>d.UpdateNewsFinish&&d.UpdateNewsFinish(...e))},"Update"),(0,l._)("button",{style:{right:"10vw"},onClick:s[8]||(s[8]=e=>i.UpdateNewsShow=!1)},"Cansel")],512),[[A.F8,i.UpdateNewsShow]]),(0,l._)("table",T,[(0,l._)("td",{onClick:s[9]||(s[9]=e=>d.GoPageNews(-2))}," << "),(0,l._)("td",{onClick:s[10]||(s[10]=e=>d.GoPageNews(-1))}," < "),(0,l._)("td",null,(0,a.zw)(i.PageNews),1),(0,l._)("td",{onClick:s[11]||(s[11]=e=>d.GoPageNews(1))}," > "),(0,l._)("td",{onClick:s[12]||(s[12]=e=>d.GoPageNews(2))}," >> ")])],512),[[A.F8,i.ShowChangeNews]]),(0,l.wy)((0,l._)("div",x,[(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":s[13]||(s[13]=e=>i.Title=e),type:"text",placeholder:"Title"},null,512),[[A.nr,i.Title]]),(0,l.wy)((0,l._)("textarea",{"onUpdate:modelValue":s[14]||(s[14]=e=>i.Text=e),type:"text",placeholder:"Text"},null,512),[[A.nr,i.Text]]),(0,l._)("button",{style:{right:"1vw"},onClick:s[15]||(s[15]=(...e)=>d.AddNews&&d.AddNews(...e))},"Create")],512),[[A.F8,i.ShowAddNews]]),(0,l.wy)((0,l._)("div",M,[(0,l._)("table",null,[v,((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(i.ArrUser,((e,s)=>((0,l.wg)(),(0,l.iD)("tr",{key:s},[(0,l._)("td",null,[(0,l._)("label",null,(0,a.zw)(e.userId),1)]),(0,l._)("td",null,[(0,l._)("label",null,(0,a.zw)(e.name),1)]),(0,l._)("td",null,[(0,l._)("label",null,(0,a.zw)(e.email),1)]),(0,l._)("td",null,[(0,l._)("label",{onClick:e=>d.ChangeRole(s),class:(0,a.C_)(["AdminClick",{ThisAdmin:"admin"==e.role,ThisNotAdmin:"admin"!=e.role}])},(0,a.zw)("admin"==e.role?"✓":"✖"),11,y)]),(0,l._)("td",null,[(0,l._)("p",{onClick:e=>d.DeleteUser(s),class:"AdminClick"},"🗑",8,f)])])))),128))]),(0,l._)("table",D,[(0,l._)("td",{onClick:s[16]||(s[16]=e=>d.GoPageAdmin(-2))}," << "),(0,l._)("td",{onClick:s[17]||(s[17]=e=>d.GoPageAdmin(-1))}," < "),(0,l._)("td",null,(0,a.zw)(i.PageUsers),1),(0,l._)("td",{onClick:s[18]||(s[18]=e=>d.GoPageAdmin(1))}," > "),(0,l._)("td",{onClick:s[19]||(s[19]=e=>d.GoPageAdmin(2))}," >> ")])],512),[[A.F8,i.ShowUsers]]),(0,l.Wm)(o,{ref:"AddAlertMess"},null,512)],64)}var R={name:"AdminComponent",components:{AlertMessages:_.Z},data(){return{ArrUser:[{}],ArrNews:[{}],PageUsers:1,PageNews:1,CountUser:0,CountNews:0,Text:"",Title:"",NewsChageId:0,ShowAddNews:!1,ShowUsers:!1,ShowChangeNews:!1,UpdateNewsShow:!1,URLdomain:""}},created(){N.Z.GetUrlDomain().then((e=>{this.URLdomain=e.data.url})),N.Z.GetCountUsers().then((e=>{this.CountUser=Math.ceil(e.data[0].name_count/10)})).catch(this.CountUser=0),N.Z.GetCountNews().then((e=>{this.CountNews=Math.ceil(e.data[0].title_count/10)})).catch(this.CountNews=0)},methods:{SaveURL(){N.Z.ChangeUrlDomain({url:this.URLdomain}).then((e=>{"OK"==e.statusText?this.$refs.AddAlertMess.AddAlertMess({status:!0,message:"Update successful"}):this.$refs.AddAlertMess.AddAlertMess({status:!1,message:"Error successful"})}))},GoPageAdmin(e){1==e&&this.PageUsers<this.CountUser?this.PageUsers+=1:-1==e&&this.PageUsers>1?this.PageUsers-=1:-2==e?this.PageUsers=1:2==e&&(this.PageUsers=this.CountUser),this.ShowUsersClick()},AddNews(){""!=this.Text&&""!=this.Title?(N.Z.CreateNews({title:this.Title,text:this.Text}).then((e=>{"OK"==e.statusText&&this.$refs.AddAlertMess.AddAlertMess({status:!0,message:"The addition was successful"})})),this.Text="",this.Title="",this.ShowAddNews=!1):this.$refs.AddAlertMess.AddAlertMess({status:!1,message:"It is necessary to fill in all fields"})},ShowUsersClick(){N.Z.GetAllUsers(this.PageUsers).then((e=>{this.ArrUser=e.data}))},DeleteUser(e){N.Z.DeleteUser({userId:this.ArrUser[e].userId}).then((e=>{"OK"==e.statusText?this.$refs.AddAlertMess.AddAlertMess({status:!0,message:"User Delete"}):this.$refs.AddAlertMess.AddAlertMess({status:!1,message:"ERROR! User dont Delete"}),this.ShowUsersClick(),N.Z.GetCountUsers().then((e=>{this.CountUser=Math.ceil(e.data[0].name_count/10)})).catch(this.CountUser=0)}))},ChangeRole(e){N.Z.ChangeRole({userId:this.ArrUser[e].userId}).then((e=>{"OK"==e.statusText?this.$refs.AddAlertMess.AddAlertMess({status:!0,message:"Change role"}):this.$refs.AddAlertMess.AddAlertMess({status:!1,message:"ERROR! Dont Change role"}),this.ShowUsersClick()}))},DeleteNews(e){console.log(this.ArrNews[e].news_id),N.Z.DeleteNews({news_id:this.ArrNews[e].news_id}).then((e=>{"OK"==e.statusText?this.$refs.AddAlertMess.AddAlertMess({status:!0,message:"News Delete"}):this.$refs.AddAlertMess.AddAlertMess({status:!1,message:"ERROR! News dont Delete"}),this.ShowUsersClick(),N.Z.GetCountNews().then((e=>{this.CountNews=Math.ceil(e.data[0].title_count/10)})).catch(this.CountNews=0)}))},ChangeNews(e){this.NewsChageId=e,this.Title=this.ArrNews[e].title,N.Z.GetNewsTitle({news_id:this.ArrNews[e].news_id}).then((e=>{this.Text=e.data.text}))},UpdateNewsFinish(){N.Z.ChangeNews({news_id:this.ArrNews[this.NewsChageId].news_id,title:this.Title,text:this.Text}).then((e=>{"OK"==e.statusText?this.$refs.AddAlertMess.AddAlertMess({status:!0,message:"News Delete"}):this.$refs.AddAlertMess.AddAlertMess({status:!1,message:"ERROR! News dont Delete"}),this.ShowNewsClick(),N.Z.GetCountNews().then((e=>{this.CountNews=Math.ceil(e.data[0].title_count/10)})).catch(this.CountNews=0)})),this.UpdateNewsShow=!1},ShowNewsClick(){N.Z.GetAllNews(this.PageNews).then((e=>{this.ArrNews=e.data}))},GoPageNews(e){1==e&&this.PageNews<this.CountNews?this.PageNews+=1:-1==e&&this.PageNews>1?this.PageNews-=1:-2==e?this.PageNews=1:2==e&&(this.PageNews=this.CountNews),this.ShowNewsClick()}}},Z=t(89);const b=(0,Z.Z)(R,[["render",G],["__scopeId","data-v-6434e0dc"]]);var I=b,H={name:"NewsMain",components:{MainHeader:c.Z,AlertMessages:_.Z,Admin:I},data(){return{ArrNews:[],PageNews:1,CountNewsInPage:1,CountNews:0,countNewsOnPage:0,Role:"user",Text:"",ShowText:!1,ShowTextKey:0}},created(){this.CheckSessionWhois(),this.GetCountNews(),this.GetNewsOnPage()},methods:{CheckSessionWhois(){N.Z.FindSession().then((e=>{e&&0!=e.data.userId?(this.authId=e.data.userId,N.Z.GetRole({userId:this.authId}).then((e=>{this.Role=e.data.role.role}))):this.authId=0}))},GetCountNews(){N.Z.GetCountNews().then((e=>{this.CountNews=e.data[0].title_count})).catch(this.CountNews=0)},GetNewsOnPage(){N.Z.GetNews({count:5,page:this.PageNews}).then((e=>{this.ArrNews=e.data}))},ReadMore(e){this.ShowText=!0,this.ShowTextKey=e,N.Z.GetNewsTitle({news_id:this.ArrNews[e].news_id}).then((e=>{this.Text=e.data.text}))},GoPageNews(e){var s=Math.ceil(this.CountNews/5);1==e&&this.PageNews<s?this.PageNews+=1:-1==e&&this.PageNews>1?this.PageNews-=1:-2==e?this.PageNews=1:2==e&&(this.PageNews=s),this.GetNewsOnPage(),this.GetCountNews()}}};const $=(0,Z.Z)(H,[["render",u],["__scopeId","data-v-0466d709"]]);var z=$}}]);
//# sourceMappingURL=314.04dd0be5.js.map