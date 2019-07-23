var express=require('express');
var router=express.Router();
const MultipartDownload = require('multipart-download');
const os = require('os');
var fs = require('fs');
//Retrieve
router.post('/',(req,res,next)=>{
var arr=[];
var total=[0,0,0,0,0,0];
var chunks=0;
//DEFINE SAVE PATH
 let mydir=os.homedir()+'\\image';
 console.log(mydir);

 function arr_contains(offset,data)
 {
    var i;
    var val=offset+data.length;
    // console.log(val);
    
    
     for(i=0;i<arr.length;i++)
     {    
        
         if(arr[i]==offset)
         {  arr[i]=val;
            total[i]++;
            return i;
         }
            
     }
     arr[i]=val;
     total[i]=1;
     return i;
     
 }
  if (!fs.existsSync(mydir)){
      fs.mkdirSync(mydir);
  }
    
     
    new MultipartDownload()
      .start(req.body.url, {
        numOfConnections: 6,
        saveDirectory: mydir,
        
        fileName: req.body.filename
      })
      .on('error', (err) => {
        // handle error here
      })
      .on('data', (data, offset) => {
        chunks++;
        // console.log(offset+" "+data.length+" "+(data.length+offset));
        var index=arr_contains(offset,data);
        
        console.log("Segment : "+index+" Offset : "+offset+" Data Size : "+data.length);
      })
      .on('end', (output) => {
        for(var i=1;i<=6;i++)
        {
            console.log("Segment "+i+":"+(total[i-1]*100/chunks)+" %");
        }
        console.log(`Downloaded file path: ${output}`);
        res.send("DONE ADITYA WAGh");
      });

 });



module.exports=router;
