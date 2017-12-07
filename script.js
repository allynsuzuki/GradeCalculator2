
//This function pulls a string of grades from each category from the website and calculates the current grade.
function calculateCurrentGrade(){
    var homeworkWeight = parseInt(document.getElementById("homeworkWeight").value);
    var quizzesWeight = parseInt(document.getElementById("quizzesWeight").value);
    var testsWeight = parseInt(document.getElementById("testsWeight").value);
    var midtermWeight = parseInt(document.getElementById("midtermWeight").value);

    var homework = document.getElementById("homework").value;
    var quizzes = document.getElementById("quizzes").value;
    var tests = document.getElementById("tests").value;
    var midterm = document.getElementById("midterm").value;

    if(homework == "" || quizzes=="" || tests=="" || midterm=="" ||homeworkWeight=="" || quizzesWeight=="" || testsWeight=="" || midtermWeight==""){
        document.getElementById("currentGrade").innerHTML= "Please make sure all fields are filled out and resubmit."
    }else{

        homework = convertArrayStringToNumber(homework);
        quizzes = convertArrayStringToNumber(quizzes);
        tests = convertArrayStringToNumber(tests);
        midterm = convertArrayStringToNumber(midterm);

        var avgHomework = averageArray(homework);
        var avgQuizzes = averageArray(quizzes);
        var avgTests = averageArray(tests);
        var avgMidterm = averageArray(midterm);

        colorCode(avgHomework,document.getElementById("homeworkRow"));
        colorCode(avgMidterm,document.getElementById("midtermRow"));
        colorCode(avgQuizzes,document.getElementById("quizzesRow"));
        colorCode(avgTests,document.getElementById("testsRow"));

        var checkQuizzes = checkData(quizzes);
        var checkHomework = checkData(homework);
        var checkTests = checkData(tests);
        var checkMidterm = checkData(midterm);

        var allData = [homeworkWeight, quizzesWeight, testsWeight, midtermWeight, checkHomework, checkTests, checkMidterm,
            checkQuizzes, avgTests, avgQuizzes, avgMidterm, avgHomework];

         var currentGrade = printGrade(allData);

        document.getElementById("calculateGradeNeeded").disabled = false;
        return currentGrade;
    }
}


//This function checks if fields are filled out and then prints the grade
function printGrade(allData) {

    if(allData[0] + allData[3] + allData[1] + allData[2] != 100){
        var notEqual = true
    }

    if (allData[7] == true || allData[5] == true || allData[6] == true || allData[4] == true ||
        allData[0] < 0 || allData[1] < 0 || allData[2] < 0 || allData[3] < 0 || notEqual==true) {
        document.getElementById("currentGrade").innerHTML = "Some fields have invalid responses. Please check and resubmit."
    } else {
        var grade = (allData[11] * (allData[0] / 100)) + (allData[9] * (allData[1] / 100)) + (allData[8] *
            (allData[2] / 100)) + (allData[10] * (allData[3] / 100));
        grade = Math.round(grade * 100) / 100;
        console.log(grade);
        document.getElementById("currentGrade").innerHTML = "This is your current grade: " + grade;
 return grade;
    }
    return 0;
}


//This function checks data to make sure no bad data is entered (negative scores)
function checkData(array){
    var num = 0;
    for(var i=0; i< array.length; i++){
        if (array[i] < 0 || isNaN(array[i])==true){
            num+=1
        }
    }
    if(num>=1){
        return true;
    }
}


//This function takes a string and converts it to an array.
function convertArrayStringToNumber(string) {
    string = string.split(",");
    for(var i=0; i< string.length; i++){
        string[i] = parseInt(string[i]);
    }
    return string;
}


//This function takes an array and finds the average of all the values.
function averageArray(array) {
    var sum= 0;

    for(var i=0; i<array.length; i++){
        sum+= array[i];
    }
    return sum/array.length;
}


//This function calculates the grade need on the final based on the desired grade and weight of final.
function calculateGradeNeeded(){
    var finalWeight = document.getElementById("finalWeight").value;
    var gradeWanted = document.getElementById("gradeWanted").value;

    if(finalWeight=="" || gradeWanted=="" || finalWeight<0){
        document.getElementById("gradeNeeded").innerHTML= "Some of your inputs are invalid. Please check and resubmit."
    }else {
        var gradeNeeded = (100 * gradeWanted - (100 - finalWeight) * calculateCurrentGrade()) / finalWeight;
        gradeNeeded = Math.round(gradeNeeded * 100) / 100;
        document.getElementById("gradeNeeded").innerHTML = "This is what you need to score on your final: " + gradeNeeded;

    }
}

//This function color codes rows based on the grades.
function colorCode(avgGrade,element){
    if (avgGrade > 90){
        element.style.background = "#268527";
    }
    if (90 >= avgGrade && avgGrade > 80){
        element.style.background = "#70e274";
    }
    if (80 >= avgGrade && avgGrade > 70){
        element.style.background = "#c6c177";
    }
    if (70 >= avgGrade && avgGrade> 60){
        element.style.background = "#d39d71";
    }
    if (60 >= avgGrade){
        element.style.background = "#d37c79";
    }

}

