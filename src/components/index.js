import Alert from "./Alert";
import AutoLogout from "./AutoLogout";
import Button from "./Button";
import CloseButton from "./CloseButton";
import Contact from "./Contact";
import ErrorMessage from "./ErrorMessage";
import FileSelect from "./FileSelect";
import FileUpload from "./FileUpload";
import HomePage from "./HomePage";
import ImageThumbnail from "./ImageThumbnail";
import LoadingView from "./LoadingView";
import LogoutButton from "./LogoutButton";
import Main from "./Main";
import Menu from "./Menu";
import MenuIcon from "./MenuIcon";
import MyLink from "./MyLink";
import Page from "./Page";
import ResponsiveImage from "./ResponsiveImage";
import RootComponent from "./RootComponent";
import Routes from "./Routes";
import Section from "./Section";
import ShareButtons from "./ShareButtons";
import SocialIcons from "./SocialIcons";
import ToggleMenu from "./ToggleMenu";

import React from "react";
import loadable from "@loadable/component";

const AboutPage   = loadable(() => import("./AboutPage"), {
  fallback: <Section className="Section--blank" />
});
const LoginPage   = loadable(() => import("./LoginPage"), {
  fallback: <Section className="Section--blank" />
});
const NotFound    = loadable(() => import("./NotFound"), {
  fallback: <Section className="Section--blank" />
});
const UploadPage  = loadable(() => import("./UploadPage"), {
  fallback: <Section className="Section--blank" />
});
const VideoDetail = loadable(() => import("./VideoDetail"), {
  fallback: <Section className="Section--blank" />
});
const VideoEdit   = loadable(() => import("./VideoEdit"), {
  fallback: <Section className="Section--blank" />
});
const VideoList   = loadable(() => import("./VideoList"), {
  fallback: <Section className="Section--blank" />
});

const Footer          = loadable(() => import("./Footer"));
const ScreenOverlay   = loadable(() => import("./ScreenOverlay"));
const ScrollToTop     = loadable(() => import("./ScrollToTop"));
const Showreel        = loadable(() => import("./Showreel"));
const SignUpButton    = loadable(() => import("./SignUpButton"));
const SignUpForm      = loadable(() => import("./SignUpForm"));
const VideoThumbnail  = loadable(() => import("./VideoThumbnail"));

export {
  AboutPage,
  Alert,
  AutoLogout,
  Button,
  CloseButton,
  Contact,
  ErrorMessage,
  FileSelect,
  FileUpload,
  Footer,
  HomePage,
  ImageThumbnail,
  LoadingView,
  LoginPage,
  LogoutButton,
  Main,
  Menu,
  MenuIcon,
  MyLink,
  NotFound,
  Page,
  ResponsiveImage,
  RootComponent,
  Routes,
  ScreenOverlay,
  ScrollToTop,
  Section,
  ShareButtons,
  Showreel,
  SignUpButton,
  SignUpForm,
  SocialIcons,
  ToggleMenu,
  UploadPage,
  VideoDetail,
  VideoEdit,
  VideoList,
  VideoThumbnail,
};
