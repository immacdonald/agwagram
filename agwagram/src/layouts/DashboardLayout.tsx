import clsx from "clsx";
import { useResponsiveContext, Button, Row, Typography, Divider, SunFilledIcon, MoonFilledIcon, DynamicHeader, MenuIcon, designTokens, useNoScroll, orUndefined, useOutsideClick } from "phantom-library";
import { ReactNode, FC, useMemo, useState, useEffect, useRef } from "react";
import styles from './DashboardLayout.module.scss';
import { Footer, Header } from "@components";
import { AgwagramIcon } from "@assets/icons";

interface DashboardLayoutProps {
    header?: boolean;
    children?: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ header = true, children }) => {
    const { atBreakpoint, windowSize, theme, toggleTheme } = useResponsiveContext();
    const isMobile = useMemo(() => atBreakpoint("md"), [windowSize.width]);
    const [sidebarActive, setSidebarActive] = useState<boolean>(false);

    const noScroll = useNoScroll();

    const ref = useRef<any>(null);

    useOutsideClick(ref, () => setSidebar(false));

    useEffect(() => {
        if(!isMobile) {
            setSidebar(false);
        } else {
            //setSidebar(true)
        }
    }, [isMobile]);

    const setSidebar = (state: boolean) => {
        noScroll(state);
        setSidebarActive(state);
    }

    const SidebarContent = useMemo(() => (
        <aside data-theme="light" className={clsx(styles.aside, { [styles.mobile]: isMobile })} data-toggled={sidebarActive} ref={ref}>
            {/*<Typography.Text style={{ fontWeight: "bold" }} newline>Agwagram</Typography.Text>*/}
            <Typography.Text style={{ fontSize: "var(--text-header-md)", fontWeight: "bold" }}><AgwagramIcon /> agwagram</Typography.Text>
            <Typography.Text newline>A <b>News Lab</b> Project</Typography.Text>
            <Divider />
            <Typography.Text style={{ fontWeight: "bold" }}>Navigation</Typography.Text>
            <Button full align="start" link='/' context='dark' variant='text'>Home</Button>
            <Button full align="start" link='/about' context='dark' variant='text'>About</Button>
            <Typography.Text style={{ fontWeight: "bold" }}>Analyze</Typography.Text>
            <Button full align="start" link='/' context='dark' variant='text'>Analyze Account(s)</Button>
            <Button full align="start" link='/' context='dark' variant='text'>Analyze Examples</Button>
            <Divider />
            <Button rounded context='dark' variant="text" onClick={() => toggleTheme()} Icon={theme == 'light' ? SunFilledIcon : MoonFilledIcon} style={{marginTop: "auto"}}/>
        </aside>
    ), [isMobile, sidebarActive, theme]);

    return (
        <Row verticalAlign='start'>
            {SidebarContent}
            <div className={styles.layout}>
                {sidebarActive && <div className={styles.darken}/>}
                {(isMobile || header) && <DynamicHeader hasBackground pageSpace="pad" style={{ borderBottom: designTokens.border.light }}>
                    <Row align="end">
                        {isMobile && <Button Icon={MenuIcon} variant='text' onClick={() => setSidebar(!sidebarActive)} />}
                    </Row>
                </DynamicHeader>}
                <main>
                    <article>{children}</article>
                    <Footer />
                </main>
            </div>
        </Row>
    );
};

export { DashboardLayout };
