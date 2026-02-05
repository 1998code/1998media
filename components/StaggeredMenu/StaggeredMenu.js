import React, {
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
    useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';

export const StaggeredMenu = ({
    position = 'right',
    colors = ['#B19EEF', '#5227FF'],
    items = [],
    socialItems = [],
    displaySocials = true,
    displayItemNumbering = true,
    className,
    logoUrl = '',
    menuButtonColor = '#fff',
    openMenuButtonColor = '#fff',
    changeMenuColorOnOpen = true,
    isFixed = false,
    accentColor = '#5227FF',
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose,
    onOverlayClick,
    triggerIcon,
    topButton,
    buttonClassName,
    forceOverlay = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const openRef = useRef(false);
    const [mounted, setMounted] = useState(false);

    const panelRef = useRef(null);
    const preLayersRef = useRef(null);
    const preLayerElsRef = useRef([]);

    const plusHRef = useRef(null);
    const plusVRef = useRef(null);
    const iconRef = useRef(null);

    const textInnerRef = useRef(null);
    const [textLines, setTextLines] = useState(['Menu', 'Close']);

    const openTlRef = useRef(null);
    const closeTweenRef = useRef(null);
    const spinTweenRef = useRef(null);
    const textCycleAnimRef = useRef(null);
    const colorTweenRef = useRef(null);
    const itemEntranceTweenRef = useRef(null);

    const toggleBtnRef = useRef(null);
    const busyRef = useRef(false);

    useEffect(() => {
        setMounted(true);
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panel = panelRef.current;
            const preContainer = preLayersRef.current;
            const plusH = plusHRef.current;
            const plusV = plusVRef.current;
            const icon = iconRef.current;
            const textInner = textInnerRef.current;

            if (!panel) return;

            const preLayers = preContainer
                ? Array.from(preContainer.querySelectorAll('.sm-prelayer'))
                : [];
            preLayerElsRef.current = preLayers;

            const offscreen = position === 'left' ? -100 : 100;
            gsap.set([panel, ...preLayers], { xPercent: offscreen });

            if (plusH && plusV && icon) {
                gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
                gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
                gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
            }

            if (textInner) gsap.set(textInner, { yPercent: 0 });
            if (toggleBtnRef.current) {
                gsap.set(toggleBtnRef.current, { color: menuButtonColor });
            }
        });
        return () => ctx.revert();
    }, [menuButtonColor, position, mounted]);

    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return null;

        openTlRef.current?.kill();
        closeTweenRef.current?.kill();
        itemEntranceTweenRef.current?.kill();

        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        const iconEls = Array.from(panel.querySelectorAll('.sm-panel-itemIcon'));
        const numberEls = Array.from(
            panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        );
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        const topButtonEl = panel.querySelector('.sm-panel-top');

        const layerStates = layers.map((el) => ({
            el,
            start: Number(gsap.getProperty(el, 'xPercent')),
        }));
        const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 5 });
        if (iconEls.length) gsap.set(iconEls, { opacity: 0, x: -15 });
        if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        if (topButtonEl) gsap.set(topButtonEl, { opacity: 0, y: -15 });

        const tl = gsap.timeline({ paused: true });
        layerStates.forEach((ls, i) => {
            tl.fromTo(
                ls.el,
                { xPercent: ls.start },
                { xPercent: 0, duration: 0.5, ease: 'power4.out' },
                i * 0.07
            );
        });

        const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
        const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
        const panelDuration = 0.65;

        tl.fromTo(
            panel,
            { xPercent: panelStart },
            { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
            panelInsertTime
        );

        if (topButtonEl) {
            tl.to(
                topButtonEl,
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                panelInsertTime + 0.2
            );
        }

        let socialsStart = panelInsertTime + panelDuration + 0.3;
        if (itemEls.length) {
            const itemsStart = panelInsertTime + panelDuration * 0.15;
            tl.to(
                itemEls,
                {
                    yPercent: 0,
                    rotate: 0,
                    duration: 1,
                    ease: 'power4.out',
                    stagger: { each: 0.08, from: 'start' },
                },
                itemsStart
            );
            if (iconEls.length) {
                tl.to(
                    iconEls,
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        stagger: { each: 0.08, from: 'start' },
                    },
                    itemsStart + 0.1
                );
            }
            if (numberEls.length) {
                tl.to(
                    numberEls,
                    {
                        duration: 0.6,
                        ease: 'power2.out',
                        '--sm-num-opacity': 1,
                        stagger: { each: 0.06, from: 'start' },
                    },
                    itemsStart + 0.15
                );
            }
            // Socials start after the last item has fully finished appearing (duration is 1s)
            socialsStart = itemsStart + (itemEls.length - 1) * 0.08 + 1.0;
        }

        if (socialTitle || socialLinks.length) {
            if (socialTitle)
                tl.to(
                    socialTitle,
                    { opacity: 1, duration: 0.5, ease: 'power2.out' },
                    socialsStart
                );
            if (socialLinks.length) {
                tl.to(
                    socialLinks,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.55,
                        ease: 'power3.out',
                        stagger: { each: 0.08, from: 'start' },
                        onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' }),
                    },
                    socialsStart + 0.1
                );
            }
        }

        openTlRef.current = tl;
        return tl;
    }, []);

    const playOpen = useCallback(() => {
        if (busyRef.current) return;
        busyRef.current = true;
        const tl = buildOpenTimeline();
        if (tl) {
            tl.eventCallback('onComplete', () => {
                busyRef.current = false;
            });
            tl.play(0);
        } else {
            busyRef.current = false;
        }
    }, [buildOpenTimeline]);

    const playClose = useCallback(() => {
        openTlRef.current?.kill();
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return;

        const all = [...layers, panel];
        const offscreen = position === 'left' ? -100 : 100;

        closeTweenRef.current = gsap.to(all, {
            xPercent: offscreen,
            duration: 0.32,
            ease: 'power3.in',
            overwrite: 'auto',
            onComplete: () => {
                const itemEls = Array.from(
                    panel.querySelectorAll('.sm-panel-itemLabel')
                );
                const iconEls = Array.from(
                    panel.querySelectorAll('.sm-panel-itemIcon')
                );
                const numberEls = Array.from(
                    panel.querySelectorAll(
                        '.sm-panel-list[data-numbering] .sm-panel-item'
                    )
                );
                const socialTitle = panel.querySelector('.sm-socials-title');
                const socialLinks = Array.from(
                    panel.querySelectorAll('.sm-socials-link')
                );
                const topButtonEl = panel.querySelector('.sm-panel-top');

                if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 5 });
                if (iconEls.length) gsap.set(iconEls, { opacity: 0, x: -15 });
                if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
                if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
                if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
                if (topButtonEl) gsap.set(topButtonEl, { opacity: 0, y: -15 });
                busyRef.current = false;
            },
        });
    }, [position]);

    const animateIcon = useCallback(
        (opening) => {
            if (triggerIcon) return;
            const h = plusHRef.current;
            const v = plusVRef.current;
            const icon = iconRef.current;
            if (!h || !v || !icon) return;
            spinTweenRef.current?.kill();
            if (opening) {
                gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
                spinTweenRef.current = gsap
                    .timeline({ defaults: { ease: 'power4.out' } })
                    .to(h, { rotate: 45, duration: 0.5 }, 0)
                    .to(v, { rotate: -45, duration: 0.5 }, 0);
            } else {
                spinTweenRef.current = gsap
                    .timeline({ defaults: { ease: 'power3.inOut' } })
                    .to(h, { rotate: 0, duration: 0.35 }, 0)
                    .to(v, { rotate: 90, duration: 0.35 }, 0)
                    .to(icon, { rotate: 0, duration: 0.001 }, 0);
            }
        },
        [triggerIcon]
    );

    const animateText = useCallback((opening) => {
        const inner = textInnerRef.current;
        if (!inner) return;
        textCycleAnimRef.current?.kill();

        const currentLabel = opening ? 'Menu' : 'Close';
        const targetLabel = opening ? 'Close' : 'Menu';
        const cycles = 3;
        const seq = [currentLabel];
        let last = currentLabel;
        for (let i = 0; i < cycles; i++) {
            last = last === 'Menu' ? 'Close' : 'Menu';
            seq.push(last);
        }
        if (last !== targetLabel) seq.push(targetLabel);
        seq.push(targetLabel);

        setTextLines(seq);
        gsap.set(inner, { yPercent: 0 });

        const lineCount = seq.length;
        const finalShift = ((lineCount - 1) / lineCount) * 100;

        textCycleAnimRef.current = gsap.to(inner, {
            yPercent: -finalShift,
            duration: 0.5 + lineCount * 0.07,
            ease: 'power4.out',
        });
    }, []);

    const animateColor = useCallback(
        (opening) => {
            const btn = toggleBtnRef.current;
            if (!btn) return;
            colorTweenRef.current?.kill();
            if (changeMenuColorOnOpen) {
                const targetColor = opening ? openMenuButtonColor : menuButtonColor;
                colorTweenRef.current = gsap.to(btn, {
                    color: targetColor,
                    delay: 0.18,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            } else {
                gsap.set(btn, { color: menuButtonColor });
            }
        },
        [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
    );

    const toggleMenu = useCallback(() => {
        const target = !openRef.current;
        openRef.current = target;
        setIsOpen(target);

        if (target) {
            onMenuOpen?.();
            playOpen();
            document.body.style.overflow = 'hidden';
        } else {
            onMenuClose?.();
            playClose();
            document.body.style.overflow = '';
        }

        animateIcon(target);
        animateText(target);
        animateColor(target);
    }, [
        onMenuOpen,
        onMenuClose,
        playOpen,
        playClose,
        animateIcon,
        animateText,
        animateColor,
    ]);

    const closeMenu = useCallback(() => {
        if (openRef.current) {
            openRef.current = false;
            setIsOpen(false);
            onMenuClose?.();
            playClose();
            animateIcon(false);
            animateText(false);
            animateColor(false);
            document.body.style.overflow = '';
        }
    }, [onMenuClose, playClose, animateIcon, animateText, animateColor]);

    useEffect(() => {
        if (!isOpen) return;
        const handleOutside = (e) => {
            if (toggleBtnRef.current?.contains(e.target)) return;
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, [isOpen, closeMenu]);

    const Overlay = (
        <div
            className={`sm-scope sm-portal-root fixed inset-0 z-[9997] transition-all ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{ '--sm-accent': accentColor }}
            onClick={(e) => {
                if (panelRef.current && !panelRef.current.contains(e.target)) {
                    closeMenu();
                }
            }}
        >
            <div
                ref={preLayersRef}
                className="sm-prelayers fixed inset-0 pointer-events-none z-[9998]"
            >
                {(colors || []).slice(0, 3).map((c, i) => (
                    <div
                        key={i}
                        className="sm-prelayer absolute inset-0 translate-x-0"
                        style={{ background: c }}
                    />
                ))}
            </div>
            <aside
                ref={panelRef}
                className="staggered-menu-panel fixed top-0 right-0 h-full bg-white/90 dark:bg-black/90 dark:text-white backdrop-blur-xl flex flex-col p-[3em_2em_2em_2em] overflow-y-auto z-[9999] pointer-events-auto"
                data-position={position}
            >
                <div className="sm-panel-inner flex-1 flex flex-col">
                    {topButton && (
                        <div
                            className="sm-panel-top mb-6 cursor-pointer"
                            onClick={closeMenu}
                        >
                            {topButton}
                        </div>
                    )}
                    <ul
                        className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
                        data-numbering={displayItemNumbering}
                    >
                        {items.map((it, idx) => (
                            <li key={idx} className="sm-panel-itemWrap overflow-hidden">
                                <a
                                    className="sm-panel-item group/item block text-[1.8rem] font-bold uppercase tracking-tighter hover:text-[var(--sm-accent)] transition-all no-underline flex items-center gap-4 py-1"
                                    href={it.link}
                                    onClick={(e) => {
                                        if (it.link.startsWith('#')) {
                                            e.preventDefault();
                                            const el = document.getElementById(it.link.substring(1));
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                            window.history.pushState(null, null, it.link);
                                        }
                                        closeMenu();
                                    }}
                                >
                                    {it.icon && (
                                        <span className="sm-panel-itemIcon inline-block text-[1em] transition-all duration-300 group-hover/item:text-[var(--sm-accent)] group-hover/item:translate-x-2">
                                            {it.icon}
                                        </span>
                                    )}
                                    <span className="sm-panel-itemLabel inline-block will-change-transform transform-origin-bottom group-hover/item:translate-x-2 transition-transform duration-300">
                                        {it.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    {displaySocials && socialItems.length > 0 && (
                        <div className="sm-socials mt-auto pt-10">
                            <div className="flex flex-row items-center gap-6 sm-socials-list">
                                {socialItems.map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="sm-socials-link transition-colors"
                                        title={s.ariaLabel || s.label}
                                        style={{ color: 'inherit' }}
                                    >
                                        {typeof s.label === 'string' && s.label.startsWith('<i') ? (
                                            <span dangerouslySetInnerHTML={{ __html: s.label }} />
                                        ) : (
                                            s.label
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );

    return (
        <div
            className={`sm-scope-root ${className || ''}`}
            style={{ '--sm-accent': accentColor }}
        >
            <button
                ref={toggleBtnRef}
                className={`sm-toggle flex items-center gap-2 bg-transparent border-0 cursor-pointer ${buttonClassName || ''}`}
                onClick={toggleMenu}
            >
                {triggerIcon ? (
                    <span
                        className="transition-transform duration-300"
                        style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                    >
                        {triggerIcon}
                    </span>
                ) : (
                    <>
                        <div className="sm-toggle-textWrap h-[1em] overflow-hidden">
                            <div ref={textInnerRef} className="flex flex-col">
                                {textLines.map((l, i) => (
                                    <span key={i} className="leading-none">
                                        {l}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div
                            ref={iconRef}
                            className="relative w-4 h-4 flex items-center justify-center"
                        >
                            <span
                                ref={plusHRef}
                                className="absolute w-full h-0.5 bg-current rounded-full"
                            />
                            <span
                                ref={plusVRef}
                                className="absolute w-full h-0.5 bg-current rounded-full"
                            />
                        </div>
                    </>
                )}
            </button>
            {mounted &&
                (forceOverlay ? createPortal(Overlay, document.body) : Overlay)}

            <style>{`
                .sm-scope-root { display: inline-block; }
                .sm-scope .staggered-menu-panel { width: clamp(300px, 40vw, 500px); box-shadow: -10px 0 30px rgba(0,0,0,0.05); }
                .sm-scope [data-position='left'] { right: auto; left: 0; box-shadow: 10px 0 30px rgba(0,0,0,0.05); }
                .sm-scope .sm-panel-list[data-numbering='true'] .sm-panel-item::after { 
                    content: counter(item, decimal-leading-zero); 
                    counter-increment: item; 
                    font-size: 0.2em; vertical-align: super; margin-left: 0.5em; opacity: 0.5; color: var(--sm-accent);
                }
                .sm-scope .sm-panel-item:hover { color: var(--sm-accent) !important; }
                .sm-scope .sm-panel-itemLabel { will-change: transform; transform-origin: 50% 100%; }
                .sm-scope .sm-panel-list { counter-reset: item; }
                .sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease, color 0.3s ease; }
                .sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
                .sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ff0000); }
                @media (max-width: 768px) { .sm-scope .staggered-menu-panel { width: 100% !important; } }
            `}</style>
        </div>
    );
};

export default StaggeredMenu;
