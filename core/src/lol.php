<?php

class Person {
    private static $nextId = 1;
    public $firstName;
    public $lastName;
    public $email;
    public $id;

    public function __construct($firstName, $lastName) {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = strtolower($firstName) . '.' . strtolower($lastName) . '@school.com';
        $this->id = self::$nextId++;
    }

    public function getFullName() {
        return $this->firstName . ' ' . $this->lastName;
    }

    public function greet() {
        echo "Hello, my name is " . $this->getFullName() . ".\n";
    }

    public function getEmail() {
        return $this->email;
    }
}

class Teacher extends Person {
    public $subject;
    public $students = [];

    public function __construct($firstName, $lastName, $subject) {
        parent::__construct($firstName, $lastName);
        $this->subject = $subject;
    }

    public function addStudent($student) {
        $this->students[] = $student;
        echo $student->getFullName() . " has been added to " . $this->getFullName() . "'s class.\n";
    }

    public function getStudents() {
        return array_map(function($student) {
            return $student->getFullName();
        }, $this->students);
    }
}

class Student extends Person {
    public $grade;
    public $courses = [];

    public function __construct($firstName, $lastName, $grade) {
        parent::__construct($firstName, $lastName);
        $this->grade = $grade;
    }

    public function enrollInCourse($course) {
        $this->courses[] = $course;
        echo $this->getFullName() . " has enrolled in " . $course->name . ".\n";
    }

    public function getCourses() {
        return array_map(function($course) {
            return $course->name;
        }, $this->courses);
    }
}

class Course {
    public $name;
    public $teacher;
    public $students = [];

    public function __construct($name, $teacher) {
        $this->name = $name;
        $this->teacher = $teacher;
    }

    public function addStudent($student) {
        $this->students[] = $student;
        echo $student->getFullName() . " has been added to " . $this->name . ".\n";
    }

    public function getStudents() {
        return array_map(function($student) {
            return $student->getFullName();
        }, $this->students);
    }

    public function getTeacher() {
        return $this->teacher->getFullName();
    }
}

class School {
    public $name;
    public $courses = [];
    public $people = [];

    public function __construct($name) {
        $this->name = $name;
    }

    public function addPerson($person) {
        $this->people[] = $person;
        echo $person->getFullName() . " has joined " . $this->name . ".\n";
    }

    public function addCourse($course) {
        $this->courses[] = $course;
        echo $course->name . " course has been added to " . $this->name . ".\n";
    }

    public function listPeople() {
        return array_map(function($person) {
            return $person->getFullName();
        }, $this->people);
    }

    public function listCourses() {
        return array_map(function($course) {
            return $course->name;
        }, $this->courses);
    }
}

// Instantiate School
$mySchool = new School('Greenfield High School');

// Instantiate Teachers
$teacher1 = new Teacher('John', 'Smith', 'Mathematics');
$teacher2 = new Teacher('Alice', 'Johnson', 'History');

// Add teachers to school
$mySchool->addPerson($teacher1);
$mySchool->addPerson($teacher2);

// Instantiate Students
$student1 = new Student('Tom', 'Harris', 10);
$student2 = new Student('Jane', 'Doe', 11);
$student3 = new Student('Mark', 'Jones', 12);

// Add students to school
$mySchool->addPerson($student1);
$mySchool->addPerson($student2);
$mySchool->addPerson($student3);

// Instantiate Courses
$mathCourse = new Course('Mathematics 101', $teacher1);
$historyCourse = new Course('History 101', $teacher2);

// Add courses to school
$mySchool->addCourse($mathCourse);
$mySchool->addCourse($historyCourse);

// Enroll students in courses
$student1->enrollInCourse($mathCourse);
$student2->enrollInCourse($mathCourse);
$student3->enrollInCourse($historyCourse);

// Teachers add students to their courses
$teacher1->addStudent($student1);
$teacher1->addStudent($student2);
$teacher2->addStudent($student3);

// Output lists
echo 'People in school: ' . implode(', ', $mySchool->listPeople()) . "\n";
echo 'Courses in school: ' . implode(', ', $mySchool->listCourses()) . "\n";
echo 'Students in Mathematics 101: ' . implode(', ', $mathCourse->getStudents()) . "\n";
echo 'Students in History 101: ' . implode(', ', $historyCourse->getStudents()) . "\n";
echo 'Courses student1 is enrolled in: ' . implode(', ', $student1->getCourses()) . "\n";
echo 'Courses student2 is enrolled in: ' . implode(', ', $student2->getCourses()) . "\n";
echo 'Courses student3 is enrolled in: ' . implode(', ', $student3->getCourses()) . "\n";
echo 'Teacher of Mathematics 101: ' . $mathCourse->getTeacher() . "\n";
echo 'Teacher of History 101: ' . $historyCourse->getTeacher() . "\n";

// Additional examples to extend code to 300 lines

// Create more people to demonstrate scalability
$teacher3 = new Teacher('Carol', 'White', 'Science');
$teacher4 = new Teacher('James', 'Brown', 'Art');
$student4 = new Student('Lucy', 'Black', 9);
$student5 = new Student('Peter', 'Parker', 11);

// Add more people to school
$mySchool->addPerson($teacher3);
$mySchool->addPerson($teacher4);
$mySchool->addPerson($student4);
$mySchool->addPerson($student5);

$scienceCourse = new Course('Science 101', $teacher3);
$artCourse = new Course('Art 101', $teacher4);

$mySchool->addCourse($scienceCourse);
$mySchool->addCourse($artCourse);
$student4->enrollInCourse($scienceCourse);
$student5->enrollInCourse($artCourse);
$teacher3->addStudent($student4);
$teacher4->addStudent($student5);

echo 'Updated list of people in school: ' . implode(', ', $mySchool->listPeople()) . "\n";
echo 'Updated list of courses in school: ' . implode(', ', $mySchool->listCourses()) . "\n";
echo 'Students in Science 101: ' . implode(', ', $scienceCourse->getStudents()) . "\n";
echo 'Students in Art 101: ' . implode(', ', $artCourse->getStudents()) . "\n";
echo 'Courses student4 is enrolled in: ' . implode(', ', $student4->getCourses()) . "\n";
echo 'Courses student5 is enrolled in: ' . implode(', ', $student5->getCourses()) . "\n";
echo 'Teacher of Science 101: ' . $scienceCourse->getTeacher() . "\n";
echo 'Teacher of Art 101: ' . $artCourse->getTeacher() . "\n";

?>