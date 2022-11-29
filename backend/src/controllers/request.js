const course = require("../models/course");
const user = require("../models/user");
const currencyConverter = require("../helper/currencyconverter");
const { json } = require("body-parser");
const request = require("../models/request");

exports.requestRefund = async (req, res) => {

    const courseId = req.params.id;
    const userId = req.body.userId;
    const reason = req.body.reason;
    const foundCourse = await course.findById(courseId);
    const foundUser = await user.findById
    (userId);
    if (!foundCourse) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    if (!foundUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    let courseIndex=-1;
    let courseFound=false;
    for(let i=0;i<foundUser.courseDetails.length;i++){
      if(foundUser.courseDetails[i].course==courseId){
        courseIndex=i;
        courseFound=true;
        break;
      }
    }

    if(!courseFound){
     return res.status(400).send({
        message: `User not registered in course`,
      });
    }
    
    if(foundUser.courseDetails[courseIndex].percentageCompleted>0.5){
      return res.status(400).send({
        message: `Cannot request refund after 50% completion`,
      });
    }

    const newRefundRequest = new request({
      course: courseId,
      user: userId,
      reason: reason,
      type:"refund",
    });
    await newRefundRequest.save();
    res.status(201).json({
      message: "Refund request sent successfully!",
    });
  };

  exports.requestCourseAccess = async (req, res) => {
      
      const courseId = req.params.id;
      const userId = req.body.userId;
      const reason = req.body.reason;
      const foundCourse = await course.findById(courseId);
      const foundUser = await user.findById
      (userId);
      if (!foundCourse) {
        return res.status(404).json({
          message: "Course not found!",
        });
      }
      if (!foundUser) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      let courseIndex=-1;
      let courseFound=false;
      for(let i=0;i<foundUser.courseDetails.length;i++){
        if(foundUser.courseDetails[i].course==courseId){
          courseIndex=i;
          courseFound=true;
          break;
        }
      }

      if(courseFound){
        return res.status(400).send({
            message: `User already registered in course`,
          });
        }

      const newAccessRequest = new request({
        course: courseId,
        user: userId,
        reason: reason,
        type:"access",
      });
      await newAccessRequest.save();
      res.status(201).json({
        message: "Access request sent successfully!",
      });
    };

    exports.getRequests = async (req, res) => {
        const type=req.query.type||"";
        const status=req.query.status||"";
        try{
            const requests = await request.find(
                { $and:
        [ {type:{ $regex: type, $options: "i" } }
                ,{status:{ $regex: status, $options: "i" }}]}
            ).sort({date:-1});
            res.status(200).json(requests);
        }
        catch(err){
            res.status(500).json({
                message: "Error fetching requests",
            });
        }
    };

    exports.declineRequest = async (req, res) => {
        try{
            const requestId = req.params.id;
            const foundRequest = await request.findById
            (requestId);
            if (!foundRequest) {
                return res.status(404).json({
                    message: "Request not found!",
                });
                }
            foundRequest.status="rejected";
            await foundRequest.save();
            res.status(200).json({
                message: "Request rejected successfully!",
            });
        }
        catch(err){
            res.status(500).json({
                message: "Error rejecting request",
            });
        }
    };

    exports.acceptRefund = async (req, res) => {
        try{
            const requestId = req.params.id;
            const foundRequest = await request.findById
            (requestId);
            if (!foundRequest) {
                return res.status(404).json({
                    message: "Request not found!",
                });
                }
            
            const foundUser = await user.findById(foundRequest.user);
            let courseIndex=-1;
            let courseFound=false;
            for(let i=0;i<foundUser.courseDetails.length;i++){
                if(foundUser.courseDetails[i].course==foundRequest.course){
                    courseIndex=i;
                    courseFound=true;
                    break;
                }
            }
            if(!courseFound){
                return res.status(404).json({
                    message: "Course not found!",
                });
            }
            const refundAmount = foundUser.courseDetails[courseIndex].amountPaid;
            foundUser.courseDetails.splice(courseIndex,1);
            foundUser.wallet+=refundAmount;
            await foundUser.save();
            foundRequest.status="accepted";
            await foundRequest.save();
            res.status(200).json({
                message: "Refund accepted successfully!",
            });
        }
        catch(err){
            res.status(500).json({
                message: "Error accepting refund",
            });
        }
    }

    exports.grantAccess = async (req, res) => {
        try{
            const requestId = req.params.id;
            const foundRequest = await request.findById
            (requestId);
            if (!foundRequest) {
                return res.status(404).json({
                    message: "Request not found!",
                });
                }
            
            const foundUser = await user.findById(foundRequest.user);
            
            const foundCourse = await course.findById(foundRequest.course);
            let sourceNumber=0;
            for(let i=0;i<foundCourse.subtitles.length;i++){
              sourceNumber+=foundCourse.subtitles[i].sources.length;
            }
            foundUser.courseDetails.push({course:courseData._id,totalSources:sourceNumber});
            await foundUser.save();
            foundRequest.status="accepted";
            await foundRequest.save();
            res.status(200).json({
                message: "Access granted successfully!",
            });
        }
        catch(err){
            res.status(500).json({
                message: "Error granting access",
            });
        }
    }


