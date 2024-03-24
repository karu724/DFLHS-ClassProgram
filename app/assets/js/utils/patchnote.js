const patch_btn = document.getElementById("patch_btn")
const patch = document.getElementById("patch")


patch_btn.addEventListener("click", function() {
  localStorage.setItem("patchnote", "false");
  patch.style.opacity = "0"
  setTimeout(() => {
    patch.style.display = "none" 
  }, 300);
  
});

const patchnotekey = localStorage.getItem("patchnote");
document.addEventListener('DOMContentLoaded', function() {
  if (patchnotekey === "false") {
    patch.style.display = "none"
  }
})
