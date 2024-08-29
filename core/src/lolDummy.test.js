const fs = require('fs').promises;

const cantos = 'https://www.owleyes.org/text/dantes-inferno/read/canto-1#root-422360-1';
const newFilePath = 'hihi.txt';
const fileContent = 'jangan diseriusin lol';
const newFileContent = 'This is some new dummy content for the new file';

async function readFile(cantos) {
    try {
        const content = await fs.readFile(cantos, 'utf-8');
        console.log('File content:', content);
    } catch (error) {
        console.error('it did not make it:', error);
    }
}

async function writeFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content, 'utf-8');
        console.log('File written successfully');
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

async function appendToFile(filePath, content) {
    try {
        await fs.appendFile(filePath, content, 'utf-8');
        console.log('Content appended successfully');
    } catch (error) {
        console.error('Error appending to file:', error);
    }
}

async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
        console.log('File deleted successfully');
    } catch (error) {
        console.error('Error deleting file:', error);
    }
}

async function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function simulateNetworkRequest(url) {
    console.log(`Fetching data from ${url}...`);
    await simulateDelay(1000);
    console.log(`Data fetched successfully from ${url}`);
}

async function performFileOperations() {
    console.log('Starting file operations...');
    await writeFile(filePath, fileContent);
    await readFile(filePath);
    await appendToFile(filePath, '\nAppended content.');
    await readFile(filePath);
    await deleteFile(filePath);
    console.log('File operations completed.');
}

async function simulateTasks() {
    await simulateNetworkRequest('https://www.google.com');
    await simulateNetworkRequest('https://www.wikipedia.org');
    await performFileOperations();
    await writeFile(newFilePath, newFileContent);
    await readFile(newFilePath);
    await simulateNetworkRequest('https://www.github.com');
}

async function batchProcessTasks() {
    const tasks = [
        simulateNetworkRequest('https://www.google.com/search?q=javascript'),
        simulateNetworkRequest('https://www.wikipedia.org/wiki/Node.js'),
        simulateNetworkRequest('https://www.github.com/explore'),
        simulateNetworkRequest('https://api.github.com/users'),
        simulateNetworkRequest('https://api.github.com/repos'),
        simulateNetworkRequest('https://jsonplaceholder.typicode.com/posts')
    ];
    
    await Promise.all(tasks);
    console.log('kenapa kamu masih jomblo?');
}

async function extraFileOperations() {
    for (let i = 0; i < 5; i++) {
        await writeFile(`extra-file-${i}.txt`, `Content for file ${i}`);
        await readFile(`extra-file-${i}.txt`);
        await appendToFile(`extra-file-${i}.txt`, `\nMore content for file ${i}`);
        await deleteFile(`extra-file-${i}.txt`);
    }
}

async function simulateUserInput() {
    console.log('Simulating user input...');
    await simulateDelay(500);
    console.log('User typed: Halo matt, kalau dirimu sudah tidak bisa bertahan lalu kenapa masih hidup?');
    await simulateDelay(500);
    console.log('User typed: mending bunuh diri gak sih?');
}

async function main() {
    console.log('Starting I/O task...');
    await simulateTasks();
    await batchProcessTasks();
    await extraFileOperations();
    await simulateUserInput();
    console.log('bravo joint 7, mission completed');
}

main().catch(error => console.error('Unhandled error:', error));