import {
Authorized, Get,BadRequestError, Body,  HttpCode, JsonController, Param,
Post
} from "routing-controllers";
import Grades from "./entity";
import Student from "../students/entity";

@JsonController()
export default class GradesController{

// @Authorized()
@Post('/students/:id([0-9]+)/grades')
@HttpCode(201)
async giveGrade(
    @Body() body: Grades,
    @Param('id') id: number
) {
    const student = await Student.findOne(id)
    const teacher = body.teacher
    const color = body.color
    const newDate = new Date()
    const remarks = body.remarks
    if(student) {

    const grade = await Grades.create({
        color,remarks,date: newDate,student: student.id,teacher
    }).save()
    student.lastGrade = color
    await student.save()



    return Grades.findOne({where: {id: grade.id}})
}  
}

// @Authorized()
@Get('/students/:id([0-9]+)/lastgrade')
@HttpCode(200)
async getGrade(
    @Param('id') id: number
) {
    const grades = await Grades.find({student: id})
    if(grades){
    const lastgrade = grades.sort((a,b)=>Number(new Date(b.date))-Number(new Date(a.date)))[0]
    return lastgrade
    } else {
        return 'Not graded yet!'
    }
    
}  
}
