// seedStudents.js
import mongoose from "mongoose";
import Student from "./models/studentmodel.js";
import "./helpers/init-mongodb.js";

const sampleStudents = [
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@university.edu",
    age: 20,
    gender: "Female",
    course: "Computer Science",
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@university.edu",
    age: 22,
    gender: "Male",
    course: "Engineering",
  },
  {
    firstName: "Sarah",
    lastName: "Davis",
    email: "sarah@university.edu",
    age: 19,
    gender: "Female",
    course: "Medicine",
  },
  {
    firstName: "David",
    lastName: "Wilson",
    email: "david@university.edu",
    age: 21,
    gender: "Male",
    course: "Business Administration",
  },
  {
    firstName: "Emma",
    lastName: "Martinez",
    email: "emma@university.edu",
    age: 20,
    gender: "Female",
    course: "Psychology",
  },
  {
    firstName: "James",
    lastName: "Garcia",
    email: "james@university.edu",
    age: 23,
    gender: "Male",
    course: "Mathematics",
  },
  {
    firstName: "Olivia",
    lastName: "Anderson",
    email: "olivia@university.edu",
    age: 18,
    gender: "Female",
    course: "Art & Design",
  },
  {
    firstName: "Ryan",
    lastName: "Thompson",
    email: "ryan@university.edu",
    age: 22,
    gender: "Male",
    course: "Physics",
  },
  {
    firstName: "Sophie",
    lastName: "Clark",
    email: "sophie@university.edu",
    age: 19,
    gender: "Female",
    course: "Chemistry",
  },
  {
    firstName: "Nathan",
    lastName: "Lee",
    email: "nathan@university.edu",
    age: 20,
    gender: "Male",
    course: "History",
  },
  {
    firstName: "Isabella",
    lastName: "Rodriguez",
    email: "isabella@university.edu",
    age: 21,
    gender: "Female",
    course: "Literature",
  },
  {
    firstName: "Marcus",
    lastName: "Taylor",
    email: "marcus@university.edu",
    age: 24,
    gender: "Male",
    course: "Economics",
  },
  {
    firstName: "Zoe",
    lastName: "White",
    email: "zoe@university.edu",
    age: 19,
    gender: "Female",
    course: "Sociology",
  },
  {
    firstName: "Ethan",
    lastName: "Miller",
    email: "ethan@university.edu",
    age: 21,
    gender: "Male",
    course: "Biology",
  },
  {
    firstName: "Maya",
    lastName: "Patel",
    email: "maya@university.edu",
    age: 20,
    gender: "Female",
    course: "Environmental Science",
  },
  {
    firstName: "Alex",
    lastName: "Chen",
    email: "alex@university.edu",
    age: 22,
    gender: "Male",
    course: "Information Technology",
  },
];

async function seedStudents() {
  try {
    // Clear existing students (optional)
    console.log("Clearing existing students...");
    await Student.deleteMany({});

    // Insert sample students
    console.log("Inserting sample students...");
    const insertedStudents = await Student.insertMany(sampleStudents);

    console.log(`✅ Successfully seeded ${insertedStudents.length} students`);
    console.log("\n📊 Student Statistics:");

    const maleCount = insertedStudents.filter(
      (s) => s.gender === "Male"
    ).length;
    const femaleCount = insertedStudents.filter(
      (s) => s.gender === "Female"
    ).length;

    console.log(`👥 Total Students: ${insertedStudents.length}`);
    console.log(`👨 Male Students: ${maleCount}`);
    console.log(`👩 Female Students: ${femaleCount}`);

    console.log("\n🎓 Courses represented:");
    const courses = [...new Set(insertedStudents.map((s) => s.course))].sort();
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course}`);
    });
  } catch (error) {
    console.error("❌ Error seeding students:", error);
  } finally {
    mongoose.connection.close();
    console.log("\n🔐 Database connection closed");
  }
}

// Run the seed function
seedStudents();
