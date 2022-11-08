import React, { useCallback } from "react";
import { useGlobals, useParameter } from '@storybook/api'
import { Icons, IconButton, WithTooltip, TooltipLinkList } from "@storybook/components";
import { PARAM_KEY, TOOL_ID } from './constants'
import {
  StyleSheets,
  StylesheetToggle,
} from './Interfaces/StyleSheetToggle.interface'

/**
 * Structures the list of stylesheets for rendering in the tooltip.
 *
 * @param {*} list
 * @param {*} set
 * @param current
 * @param {*} close
 * @returns
 */
const generateLinkList = (list: any, set: any, current: any, close: any) => {
  return list
  .map((i: StyleSheets) => {
    return {
      ...i,
      onClick: () => {
        set(i.id);
        close();
      },
      active: i.id === current,
    };
  });
}

export const Tool = () => {
  const [{ selectedStylesheetID }, updateGlobals] = useGlobals();
  const paramData = useParameter<StylesheetToggle>(PARAM_KEY, {
    stylesheets: null
  });

  const updateSelectedStylesheet = useCallback(
    (id) =>
      updateGlobals({
        selectedStylesheetID: id,
      }),
    [selectedStylesheetID]
  );

  if (paramData?.stylesheets && !selectedStylesheetID) {
    updateSelectedStylesheet(paramData?.stylesheets[0].id);
  }

  return (
      <WithTooltip
        placement="top"
        trigger="click"
        tooltip={({ onHide }) => (
          <TooltipLinkList links={generateLinkList(paramData?.stylesheets, updateSelectedStylesheet, selectedStylesheetID, onHide)} />
        )}
        closeOnClick
      >
        <IconButton
          key={TOOL_ID}
          title="Toggle stylesheet"
        >
          <Icons icon="paintbrush" />
        </IconButton>
      </WithTooltip>
  );
};
