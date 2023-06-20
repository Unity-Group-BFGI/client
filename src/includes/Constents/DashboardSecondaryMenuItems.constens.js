const MyAccountRoutes = [
    {
        key: 0,
        menu: false,
        parent: "my-account",
        parentHeading: "My Account",
        href: "/dashboard/my-account",
        redirect: true,
        redirectUrl: "/dashboard/my-account/overview",
        baseUrl: "/dashboard/my-account/overview",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 1,
        menu: true,
        parent: "my-account",
        parentHeading: "My Account",
        child: "my-account-overview",
        childHeading: "Overview",
        href: "/dashboard/my-account/overview",
        icon: "user-circle",
        baseUrl: "/dashboard/my-account/overview",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 2,
        menu: true,
        parent: "my-account",
        parentHeading: "My Account",
        child: "my-account-settings",
        childHeading: "Settings",
        href: "/dashboard/my-account/settings",
        icon: "fa-cog",
        baseUrl: "/dashboard/my-account/overview",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 3,
        menu: true,
        parent: "my-account",
        parentHeading: "My Account",
        child: "my-account-security",
        childHeading: "Security",
        href: "/dashboard/my-account/security",
        icon: "fingerprint",
        baseUrl: "/dashboard/my-account/overview",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 4,
        menu: true,
        parent: "my-account",
        parentHeading: "My Account",
        child: "my-account-billings",
        childHeading: "Billings",
        href: "/dashboard/my-account/billings",
        icon: "credit-card",
        baseUrl: "/dashboard/my-account/overview",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 5,
        menu: true,
        parent: "my-account",
        parentHeading: "My Account",
        child: "my-account-logs",
        childHeading: "Logs",
        href: "/dashboard/my-account/logs",
        icon: "calander",
        baseUrl: "/dashboard/my-account/overview",
        type: "child",
        dynamicRoute: false
    }
]; 

const IeltsLmsRoutes = [
    {
        key: 0,
        menu: false,
        parent: "ielts-lms",
        parentHeading: "Ielts Lms",
        href: "/dashboard/ielts-lms",
        redirect: true,
        redirectUrl: "/dashboard/ielts-lms/my",
        baseUrl: "/dashboard/ielts-lms/my",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 1,
        menu: true,
        parent: "ielts-lms",
        parentHeading: "Ielts Lms",
        child: "ielts-lms-my-quizzes",
        childHeading: "My Quizzes",
        href: "/dashboard/ielts-lms/my",
        icon: "fa-book",
        actions: true,
        actionsHtml: ["my-quizz-actions"],
        baseUrl: "/dashboard/ielts-lms/my",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 2,
        menu: true,
        parent: "ielts-lms",
        parentHeading: "Ielts Lms",
        child: "ielts-lms-free-quizzes",
        childHeading: "Free Quizzes",
        href: "/dashboard/ielts-lms/free",
        icon: "fa-bookmark",
        baseUrl: "/dashboard/ielts-lms/my",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 3,
        menu: false,
        parent: "ielts-lms",
        parentHeading: "Ielts Lms",
        child: "ielts-lms-edit-quiz",
        childHeading: "Edit Quiz",
        href: "/dashboard/ielts-lms/quiz/edit",
        parms: true,
        baseUrl: "/dashboard/ielts-lms/my",
        type: "child",
        dynamicRoute: true
    }
];

const ReadingRoutes = [
    {
        key: 0,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "edit",
        subChildHeading: "Edit",
        slug: "ielts-lms-edit-quiz-basic",
        subChildSubHeading: "Edit Basic details",
        href: "edit",
        activeClass: "bg-light-primary txt-primary border-primary",
        icon: "svg-pencil",
        iconColorClass: "svg-icon-primary",
        iconBgColorClass: "bg-light-primary"
    },
    {
        key: 1,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "Passages",
        subChildHeading: "Passages",
        slug: "ielts-lms-edit-quiz-passages",
        subChildSubHeading: "Reading Passages",
        href: "passages",
        activeClass: "bg-light-warning txt-warning border-warning",
        icon: "svg-1",
        iconColorClass: "svg-icon-warning",
        iconBgColorClass: "bg-light-warning"
    },
    {
        key: 2,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "questions",
        subChildHeading: "Questions",
        slug: "ielts-lms-edit-quiz-questions",
        subChildSubHeading: "Reading Questions",
        href: "questions",
        activeClass: "bg-light-danger txt-danger border-danger",
        icon: "svg-2",
        iconColorClass: "svg-icon-danger",
        iconBgColorClass: "bg-light-danger"
    },
    {
        key: 3,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "settings",
        subChildHeading: "Settings",
        slug: "ielts-lms-edit-quiz-settings",
        subChildSubHeading: "Reading settings & scores",
        href: "settings",
        activeClass: "bg-light-info txt-info border-info",
        icon: "svg-3",
        iconColorClass: "svg-icon-info",
        iconBgColorClass: "bg-light-info"
    },
    {
        key: 4,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "analytics",
        subChildHeading: "Analytics",
        slug: "ielts-lms-edit-quiz-analytics",
        subChildSubHeading: "Reading quiz logs & analytics",
        href: "analytics",
        activeClass: "bg-light-secondary txt-secondary border-secondary",
        icon: "svg-analytics",
        iconColorClass: "svg-icon-dark-secondary",
        iconBgColorClass: "bg-light-secondary"
    }
];

const ListeningRoutes = [
    {
        key: 0,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "edit",
        subChildHeading: "Edit",
        slug: "ielts-lms-edit-quiz-basic",
        subChildSubHeading: "Edit Basic details",
        href: "edit",
        activeClass: "bg-light-primary txt-primary border-primary",
        icon: "svg-pencil",
        iconColorClass: "svg-icon-primary",
        iconBgColorClass: "bg-light-primary"
    },
    {
        key: 1,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "Passages",
        subChildHeading: "Passages",
        slug: "ielts-lms-edit-quiz-passages",
        subChildSubHeading: "Listening Passages",
        href: "passages",
        activeClass: "bg-light-warning txt-warning border-warning",
        icon: "svg-1",
        iconColorClass: "svg-icon-warning",
        iconBgColorClass: "bg-light-warning"
    },
    {
        key: 2,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "questions",
        subChildHeading: "Questions",
        slug: "ielts-lms-edit-quiz-questions",
        subChildSubHeading: "Listening Questions",
        href: "questions",
        activeClass: "bg-light-danger txt-danger border-danger",
        icon: "svg-2",
        iconColorClass: "svg-icon-danger",
        iconBgColorClass: "bg-light-danger"
    },
    {
        key: 3,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "settings",
        subChildHeading: "Settings",
        slug: "ielts-lms-edit-quiz-settings",
        subChildSubHeading: "Listening settings & scores",
        href: "settings",
        activeClass: "bg-light-info txt-info border-info",
        icon: "svg-3",
        iconColorClass: "svg-icon-info",
        iconBgColorClass: "bg-light-info"
    },
    {
        key: 4,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "analytics",
        subChildHeading: "Analytics",
        slug: "ielts-lms-edit-quiz-analytics",
        subChildSubHeading: "Listening quiz logs & analytics",
        href: "analytics",
        activeClass: "bg-light-secondary txt-secondary border-secondary",
        icon: "svg-analytics",
        iconColorClass: "svg-icon-dark-secondary",
        iconBgColorClass: "bg-light-secondary"
    }
];

const WritingRoutes = [
    {
        key: 0,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "edit",
        subChildHeading: "Edit",
        slug: "ielts-lms-edit-quiz-basic",
        subChildSubHeading: "Edit Basic details",
        href: "edit",
        activeClass: "bg-light-primary txt-primary border-primary",
        icon: "svg-pencil",
        iconColorClass: "svg-icon-primary",
        iconBgColorClass: "bg-light-primary"
    },
    {
        key: 1,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "essay",
        subChildHeading: "Essay",
        slug: "ielts-lms-edit-quiz-writing-essay",
        subChildSubHeading: "Writing essay",
        href: "essay",
        activeClass: "bg-light-warning txt-warning border-warning",
        icon: "svg-1",
        iconColorClass: "svg-icon-warning",
        iconBgColorClass: "bg-light-warning"
    },
    {
        key: 2,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "settings",
        subChildHeading: "Settings",
        slug: "ielts-lms-edit-quiz-settings",
        subChildSubHeading: "Writing settings & scores",
        href: "settings",
        activeClass: "bg-light-info txt-info border-info",
        icon: "svg-3",
        iconColorClass: "svg-icon-info",
        iconBgColorClass: "bg-light-info"
    },
    {
        key: 3,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "analytics",
        subChildHeading: "Analytics",
        slug: "ielts-lms-edit-quiz-analytics",
        subChildSubHeading: "Writing quiz logs & analytics",
        href: "analytics",
        activeClass: "bg-light-secondary txt-secondary border-secondary",
        icon: "svg-analytics",
        iconColorClass: "svg-icon-dark-secondary",
        iconBgColorClass: "bg-light-secondary"
    }
];

const SpeakingRoutes = [
    {
        key: 0,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "edit",
        subChildHeading: "Edit",
        slug: "ielts-lms-edit-quiz-basic",
        subChildSubHeading: "Edit Basic details",
        href: "edit",
        activeClass: "bg-light-primary txt-primary border-primary",
        icon: "svg-pencil",
        iconColorClass: "svg-icon-primary",
        iconBgColorClass: "bg-light-primary"
    },
    {
        key: 1,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "sections",
        subChildHeading: "Sections",
        slug: "ielts-lms-edit-quiz-sections",
        subChildSubHeading: "Speaking Sections",
        href: "sections",
        activeClass: "bg-light-warning txt-warning border-warning",
        icon: "svg-1",
        iconColorClass: "svg-icon-warning",
        iconBgColorClass: "bg-light-warning"
    },
    {
        key: 2,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "questions",
        subChildHeading: "Questions",
        slug: "ielts-lms-edit-quiz-speaking-questions",
        subChildSubHeading: "Speaking Questions",
        href: "questions",
        activeClass: "bg-light-warning txt-warning border-warning",
        icon: "svg-2",
        iconColorClass: "svg-icon-warning",
        iconBgColorClass: "bg-light-warning"
    },
    {
        key: 3,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "settings",
        subChildHeading: "Settings",
        slug: "ielts-lms-edit-quiz-settings",
        subChildSubHeading: "Speaking settings & scores",
        href: "settings",
        activeClass: "bg-light-info txt-info border-info",
        icon: "svg-3",
        iconColorClass: "svg-icon-info",
        iconBgColorClass: "bg-light-info"
    },
    {
        key: 4,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "analytics",
        subChildHeading: "Analytics",
        slug: "ielts-lms-edit-quiz-analytics",
        subChildSubHeading: "Speaking quiz logs & analytics",
        href: "analytics",
        activeClass: "bg-light-secondary txt-secondary border-secondary",
        icon: "svg-analytics",
        iconColorClass: "svg-icon-dark-secondary",
        iconBgColorClass: "bg-light-secondary"
    }     
];

export { MyAccountRoutes, IeltsLmsRoutes, ReadingRoutes, ListeningRoutes, WritingRoutes, SpeakingRoutes };