import * as fs from 'fs'
import * as matter from 'gray-matter';

// Read hybrid (yaml/md) file
try {
    var file = fs.readFileSync('md/filemdyaml.md', 'utf8')
} catch (err) {
    console.error(err)
    var file = ''
}

// Parse hybrid file into yaml and md
var parsedFile = matter(file)
console.log(parsedFile)

// Save yaml and md to JSON file
try {
    const toJson = fs.writeFileSync('../json/slides.json', JSON.stringify(parsedFile))
} catch (err) {
    console.error(err)
}
