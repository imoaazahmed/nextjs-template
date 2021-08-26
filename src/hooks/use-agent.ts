import { useState, useEffect } from 'react';

type BrowserTypes = {
  name: string;
  version: string;
  v: number;
  userAgent: string;
  app: string;
  os: string;
};

type AgentTypes = {
  browser: BrowserTypes;
  pointLock: boolean;
  isMobile: boolean;
};

export function useAgent(): AgentTypes {
  const [agent, setAgent] = useState<AgentTypes>({
    browser: {
      name: 'Unknown',
      version: 'Unknown',
      v: 0,
      userAgent: 'Unknown',
      app: 'Unknown',
      os: 'Unknown',
    },
    pointLock: false,
    isMobile: false,
  });

  useEffect(() => {
    const agentCopy: AgentTypes = { ...agent };
    const nAgt = navigator.userAgent;
    let browserName = navigator.appName;
    let fullVersion = '' + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset;
    let verOffset;
    let ix;

    agentCopy.pointLock =
      'pointerLockElement' in document ||
      'mozPointerLockElement' in document ||
      'webkitPointerLockElement' in document;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
      browserName = 'Opera';
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) !== -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }

    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
      browserName = 'Microsoft Internet Explorer';
      fullVersion = nAgt.substring(verOffset + 5);
    }

    // In Chrome, the true version is after "Chrome"
    else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
      browserName = 'Chrome';
      fullVersion = nAgt.substring(verOffset + 7);
    }

    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
      browserName = 'Safari';
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) !== -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }

    // In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
      browserName = 'Firefox';
      fullVersion = nAgt.substring(verOffset + 8);
    }

    // In most other browsers, "name/version" is at the end of userAgent
    else if (
      (nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))
    ) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() === browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }

    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(';')) !== -1)
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(' ')) !== -1)
      fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    agentCopy.browser.name = browserName;
    agentCopy.browser.version = fullVersion;
    agentCopy.browser.v = majorVersion;
    agentCopy.browser.app = navigator.appName;
    agentCopy.browser.userAgent = navigator.userAgent;

    let OSName = 'Unknown OS';
    if (navigator.appVersion.indexOf('Win') !== -1) OSName = 'Windows';
    if (navigator.appVersion.indexOf('Mac') !== -1) OSName = 'MacOS';
    if (navigator.appVersion.indexOf('X11') !== -1) OSName = 'UNIX';
    if (navigator.appVersion.indexOf('Linux') !== -1) OSName = 'Linux';

    agentCopy.browser.os = OSName;

    // Check if is mobile
    const isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(
      navigator.userAgent
    );

    if (isMobile) agentCopy.isMobile = true;

    setAgent(agentCopy);
  }, []);

  return agent;
}
