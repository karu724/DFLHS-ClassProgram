const fs = require('fs');

class_selector.addEventListener("change", function () {
    selectedValue = class_selector.value;
    const filePath = `${process.env.APPDATA}/.classprogram/settings.json`;
    const settings = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    settings.class = selectedValue;

    fs.writeFileSync(filePath, JSON.stringify(settings));
});

let selectedValue

function readSettingsFile() {
  const filePath = `${process.env.APPDATA}/.classprogram/settings.json`;

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const settings = JSON.parse(data);
    return settings;
  } catch (error) {
    console.error('Failed to read settings file:', error);
    return null;
  }
}

// 예제 사용
const classvalue = readSettingsFile();
if (settings) {
    console.log('Read settings:', settings);
    console.log(classvalue.class);
    const selectElement = document.getElementById('classes');
    selectElement.value = classvalue.class;
} else {
    console.log('Failed to read settings file.');
}

