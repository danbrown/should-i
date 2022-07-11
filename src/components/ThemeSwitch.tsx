import { useState } from "react";
import Head from "next/head";
import {
  Button,
  ButtonGroup,
  Typography,
  useTheme,
  Page,
  Switch,
  Flex,
  IconButton,
} from "@wipsie/ui";
import { Sun, Moon, Star } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTheme } from "../redux/slices/settings";

export default function ThemeSwitch(props: any) {
  const theme = useTheme();
  const settings = useSelector((state: any) => state.settings);
  const dispatch = useDispatch();

  return (
    <ButtonGroup size="mini">
      <IconButton
        variant={settings.theme === "light" ? "outlined" : "contained"}
        onClick={() => dispatch(setCurrentTheme("light"))}
      >
        <Sun />
      </IconButton>
      <IconButton
        variant={settings.theme === "dark" ? "outlined" : "contained"}
        onClick={() => dispatch(setCurrentTheme("dark"))}
      >
        <Moon />
      </IconButton>
      <IconButton
        variant={settings.theme === "cosmic" ? "outlined" : "contained"}
        onClick={() => {
          dispatch(setCurrentTheme("cosmic"));
        }}
      >
        <Star />
      </IconButton>
    </ButtonGroup>
  );
}
