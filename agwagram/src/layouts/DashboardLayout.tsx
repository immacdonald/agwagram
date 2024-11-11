import { ReactNode, FC, useMemo, useState, useEffect, useRef } from 'react';
import { AgwagramIcon } from '@assets/icons';
import clsx from 'clsx';
import { useResponsiveContext, Button, Row, Typography, Divider, DynamicHeader, MenuIcon, designTokens, useNoScroll, orUndefined, useOutsideClick, setModal } from 'phantom-library';
import { AnalysisConfig } from '@views';
import { Footer } from './Footer';
import styles from './DashboardLayout.module.scss';

interface DashboardLayoutProps {
    header?: boolean;
    children?: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ header = true, children }) => {
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
                <Typography.Text newline style={{ fontSize: 'var(--font-sm)' }}>
                    A <b>News Lab</b> Project
                </Typography.Text>
                <Divider />
                <Typography.Text style={{ fontWeight: 'bold' }}>Navigation</Typography.Text>
                <Button full align="start" link="/" context="dark" variant="text">
                    Home
                </Button>
                <Button full align="start" link="/about" context="dark" variant="text">
                    About
                </Button>
                <Typography.Text style={{ fontWeight: 'bold' }}>Analyze</Typography.Text>
                <Button full align="start" link="/" context="dark" variant="text">
                    Upload Files
                </Button>
                <Button full align="start" link="/" context="dark" variant="text">
                    Example Accounts
                </Button>
                <Button full align="start" context="dark" variant="text" onClick={() => setModal(<AnalysisConfig />)}>
                    Analysis Settings
                </Button>
            </aside>
        ),
        [isMobile, sidebarActive]
    );

    return (
        <Row verticalAlign="start">
            {!fullscreen && SidebarContent}
            <div className={styles.layout} data-fullscreen={orUndefined(fullscreen, '')}>
                {sidebarActive && <div className={styles.darken} />}
                {(isMobile || header) && (
                    <DynamicHeader hasBackground pageSpace="pad" style={{ borderBottom: designTokens.border.light }}>
                        <Row align="space-between">
                            {isMobile ? (
                                <span style={{ color: 'var(--color-primary)', fontSize: 'var(--text-header-md)', fontWeight: 'bold' }}>agwagram</span>
                            ) : (
                                <Button variant="text" onClick={() => setFullscreen(!fullscreen)}>
                                    Fullscreen
                                </Button>
                            )}
                            {isMobile && <Button Icon={MenuIcon} variant="text" onClick={() => setSidebar(!sidebarActive)} />}
                        </Row>
                    </DynamicHeader>
                )}
                <main>
                    <article>{children}</article>
                    <Footer />
                </main>
            </div>
        </Row>
    );
};

export { DashboardLayout };
