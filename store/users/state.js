const state = () => ({
  search:'',
    users:[
    ],
    
    user :{
        "login": "evanphx",
        "id": 7,
        "node_id": "MDQ6VXNlcjc=",
        "avatar_url": "https://avatars.githubusercontent.com/u/7?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/evanphx",
        "html_url": "https://github.com/evanphx",
        "followers_url": "https://api.github.com/users/evanphx/followers",
        "following_url": "https://api.github.com/users/evanphx/following{/other_user}",
        "gists_url": "https://api.github.com/users/evanphx/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/evanphx/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/evanphx/subscriptions",
        "organizations_url": "https://api.github.com/users/evanphx/orgs",
        "repos_url": "https://api.github.com/users/evanphx/repos",
        "events_url": "https://api.github.com/users/evanphx/events{/privacy}",
        "received_events_url": "https://api.github.com/users/evanphx/received_events",
        "type": "User",
        "site_admin": false
       
    },
    headerUsres:
        [
            {
                text: "Avatar",
                sortable: false,
                value: "avatar_url",
                align: "start",

            },
            {
              text: "Login",
              value: "login",
             
            },
            {
              text: "Perfil", value: "type" , 
            },
            {
              text: "Admin", value: "site_admin" , 
            },
           
            {
              text: "Site", value: "html_url" ,
            },
            
            {
              text: "", value: "actions", sortable: false  ,align: "end",
            },
          ],
   

});
export default state;
