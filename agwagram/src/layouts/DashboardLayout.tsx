import { ReactNode, FC, useMemo, useState, useEffect, useRef } from 'react';
import { AgwagramIcon, FullscreenExitIcon, FullscreenIcon, HelpIcon, HomeIcon, PersonSearchIcon, TuneIcon, UploadFileIcon } from '@assets/icons';
import clsx from 'clsx';
import { useResponsiveContext, Button, Row, Typography, Divider, DynamicHeader, MenuIcon, designTokens, useNoScroll, useOutsideClick, setModal } from 'phantom-library';
import { AnalysisConfig } from '@views';
import { Footer } from './Footer';
import styles from './DashboardLayout.module.scss';

interface DashboardLayoutProps {
    children?: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    const { atBreakpoint, windowSize } = useResponsiveContext();
    const isMobile = useMemo(() => atBreakpoint('md'), [windowSize.width]);
    const [sidebarActive, setSidebarActive] = useState<boolean>(false);

    const noScroll = useNoScroll();

    const ref = useRef<any>(null);

    useOutsideClick(ref, () => setSidebar(false));

    useEffect(() => {
        setSidebar(false);
        setFullscreen(false);
    }, [isMobile]);

    const setSidebar = (state: boolean) => {
        noScroll(state);
        setSidebarActive(state);
    };

    const [fullscreen, setFullscreen] = useState<boolean>(false);

    const SidebarContent = useMemo(
        () => (
            <aside data-theme="light" className={clsx(styles.aside, { [styles.mobile]: isMobile })} data-toggled={sidebarActive} ref={ref}>
                <Typography.Text style={{ fontSize: 'var(--text-header-md)', fontWeight: 'bold' }}>
                    <AgwagramIcon /> agwagram
                </Typography.Text>
                <Typography.Text newline style={{ fontSize: 'var(--font-size-sm)' }}>
                    A <b>News Lab</b> Project
                </Typography.Text>
                <Divider />
                <Typography.Text style={{ fontWeight: 'bold' }}>Navigation</Typography.Text>
                <Button full align="start" link="/" context="dark" variant="text" Icon={HomeIcon}>
                    Home
                </Button>
                <Button full align="start" link="/about" context="dark" variant="text" Icon={HelpIcon}>
                    About
                </Button>
                <Typography.Text style={{ fontWeight: 'bold' }}>Analyze</Typography.Text>
                <Button full align="start" link="/" context="dark" variant="text" Icon={UploadFileIcon}>
                    Upload Files
                </Button>
                <Button full align="start" link="/" context="dark" variant="text" Icon={PersonSearchIcon}>
                    Example Accounts
                </Button>
                <Button full align="start" context="dark" variant="text" onClick={() => setModal(<AnalysisConfig />)} Icon={TuneIcon}>
                    Analysis Settings
                </Button>
            </aside>
        ),
        [isMobile, sidebarActive]
    );

    return (
        <Row verticalAlign="start">
            {!fullscreen && SidebarContent}
            <div className={styles.layout}>
                {sidebarActive && <div className={styles.darken} />}
                {
                    <DynamicHeader hasBackground pageSpace="pad" style={{ borderBottom: designTokens.border.light, paddingInline: designTokens.space.md }}>
                        <Row align="start">
                            {isMobile && <Button Icon={MenuIcon} variant="text" onClick={() => setSidebar(!sidebarActive)} />}
                            {isMobile ? (
                                <span style={{ color: 'var(--color-primary-text)', fontSize: 'var(--text-header-md)', fontWeight: 'bold', marginLeft: designTokens.space.md }}>agwagram</span>
                            ) : (
                                <Button variant="text" onClick={() => setFullscreen(!fullscreen)} Icon={fullscreen ? FullscreenExitIcon : FullscreenIcon} />
                            )}
                        </Row>
                    </DynamicHeader>
                }
                <main>
                    <article>{children}</article>
                    <Footer />
                </main>
            </div>
        </Row>
    );
};

export { DashboardLayout };
