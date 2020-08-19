const express=require('express')
const axios =require('axios')
const Axios = require('axios').default
const app=express()

const sendPostRequest = async (url,link) => {
    try {
        const resp = await axios.post(url, {url:link});
        return resp.data
    } catch (err) {
        console.error(err);
    }
};
app.get('/',(req,res)=>{
    console.log('api calling')
    Axios.get('https://rtb-backend1.herokuapp.com/rtb_mern/firstpulltest/2020-08-11',{
    headers:{
        'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphbG15a2FyaW1pMUBnbWFpbC5jb20iLCJpYXQiOjE1OTc3ODc4MjIsImV4cCI6MTU5Nzc5MTQyMn0.S9lus7ki1_0l0OL2HIvYYDQ2BJ3jyLD8WRdJRfMV_jI'
        }
    })
    .then(respond=>{
        let updateData=[]
        console.log('looping and data langth', respond.data.length)
        respond.data.map(single=>{
            let singleArticle=single
            const store=async()=>{
                try {
                    singleArticle.blurb=await sendPostRequest('https://rtb-text.herokuapp.com/',single.link)
                    updateData.push(singleArticle)
                    console.log(updateData.length)

                    if(updateData.length==respond.data.length){
                        console.log(updateData.length,respond.data.length)
                        res.json(updateData)
                    }
                } catch (error) {
                    console.log(err)
                }
            }
            store()
        })
    })
    .catch(err=>{
        console.log(err)
        res.json({message:"server error"})
    })
})



app.listen(8080,()=>{
    console.log("Server started",8080)
})
