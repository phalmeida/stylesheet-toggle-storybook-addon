import type { DecoratorFunction } from '@storybook/addons'
import { useEffect, useGlobals, useParameter } from "@storybook/addons";
import { PARAM_KEY } from './constants'
import { StylesheetToggle } from './Interfaces/StyleSheetToggle.interface'

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
  const [{ selectedStylesheetID }, updateGlobals] = useGlobals();
  const paramData = useParameter<StylesheetToggle>(PARAM_KEY, {
    stylesheets: null
  });
  const selectedStylesheet = paramData?.stylesheets.find(
    (s) => s.id === selectedStylesheetID)
  useEffect(() => {
      updateStylesheet(selectedStylesheet?.url, selectedStylesheet?.id)
  }, [selectedStylesheetID])

  return StoryFn()
}

function updateStylesheet (url: string, id: string) {
  const headEl = document.querySelector('head')
  const rootElement = document.getElementById('root');
  rootElement.classList.forEach(className => rootElement.classList.remove(className))
  rootElement.classList.add(id);
  let stylesheetEl: any = document.querySelector('link[data-toggle]')

  if (!stylesheetEl) {
    stylesheetEl = document.createElement('link')
    stylesheetEl.rel = 'stylesheet'
    stylesheetEl.dataset.toggle = true
    headEl.appendChild(stylesheetEl)

    let preElement = document.createElement("pre");
    rootElement.appendChild(preElement);
    preElement.innerText = '${JSON.stringify(url, null, 2)} = ' + url;
  }

  stylesheetEl.href = url
}
