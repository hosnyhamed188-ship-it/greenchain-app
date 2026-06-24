import { useState, useEffect, useRef, createContext, useContext, useMemo } from "react";
import { supabase } from './supabase.js'
// ── THEME ──────────────────────────────────────────────────────
const T = {
  bg:"#060d0a",surface:"#0a1510",panel:"#0d1a13",border:"#162a1e",borderHi:"#1e4a30",
  green:"#00ff88",greenDim:"#00cc66",greenGlow:"rgba(0,255,136,0.15)",greenDeep:"rgba(0,255,136,0.06)",
  teal:"#00d4aa",amber:"#ffaa00",red:"#ff3355",blue:"#4da8ff",
  textPri:"#c8e8d8",textSec:"#6a9e80",textMute:"#2e5040",
  fontMono:"'IBM Plex Mono','JetBrains Mono',monospace",
  fontDisplay:"'Orbitron','Rajdhani',sans-serif",
  fontBody:"'Exo 2','Nunito',sans-serif",
};

// ── 7 LANGUAGES ────────────────────────────────────────────────
const LANGS = [
  { code:"en", label:"EN", name:"English",    rtl:false, flag:"🇬🇧" },
  { code:"ar", label:"ع",  name:"العربية",    rtl:true,  flag:"🇸🇦" },
  { code:"fr", label:"FR", name:"Français",   rtl:false, flag:"🇫🇷" },
  { code:"pt", label:"PT", name:"Português",  rtl:false, flag:"🇧🇷" },
  { code:"zh", label:"中", name:"中文",       rtl:false, flag:"🇨🇳" },
  { code:"ru", label:"РУ", name:"Русский",    rtl:false, flag:"🇷🇺" },
  { code:"de", label:"DE", name:"Deutsch",    rtl:false, flag:"🇩🇪" },
];

const TR = {
  en:{
    appName:"GREENCHAIN",tagline:"Supply chains.",taglineGreen:"Decarbonized.",
    systemAccess:"System Access",gateway:"ZERO-TRUST ENTERPRISE GATEWAY",
    enterpriseId:"Enterprise ID",passkey:"Passkey",awaitHandshake:"Awaiting secure handshake...",
    initiateSession:"INITIATE SESSION",authenticating:"AUTHENTICATING...",
    sso:"SSO via Azure AD / Okta / SAML 2.0",devBypass:"⚙ DEV BYPASS",
    devMode:"DEVELOPER MODE · NOT FOR PRODUCTION",security:"AES-256 · TLS 1.3 · MFA ENFORCED · SOC 2 TYPE II",
    build:"GreenChain AI © 2025 · Build v4.12.3",networkHealth:"Network Health",allNominal:"ALL SYSTEMS NOMINAL",
    terminateSession:"TERMINATE SESSION",authenticated:"AUTHENTICATED",enterpriseDashboard:"Enterprise Dashboard",
    coreModules:"CORE MODULES",intelligence:"INTELLIGENCE",system:"SYSTEM",commerce:"COMMERCE",
    navDashboard:"Command Matrix",navCompliance:"Compliance Core",navOptimizer:"Cost Optimizer",
    navSourcing:"Sourcing Grid",navReports:"AI Reports",navCredits:"Carbon Credits",
    navSettings:"Configuration",navExports:"Audit Exports",
    moduleUnderConstruction:"MODULE UNDER CONSTRUCTION",
    navigateTo:"Navigate to Dashboard, Optimizer, Sourcing Grid, AI Reports or Carbon Credits",
    initTelemetry:"Initializing telemetry matrix...",
    mod1eyebrow:"Module I · Live",mod1title:"Command Telemetry Matrix",
    mod1meta:"Last sync: 14 Jun 2026 · 09:42 UTC · 3 active leakage warnings",
    kpi1label:"Scope 1 Emissions",kpi1val:"12,480",kpi1unit:"tCO₂e",kpi1sub:"▼ 8.2% vs last quarter",
    kpi2label:"Carbon Tax Liability",kpi2val:"$284K",kpi2unit:"YTD",kpi2sub:"▲ 12% — EU CBAM update",
    kpi3label:"Cost Leakage Caught",kpi3val:"$1.4M",kpi3unit:"Recovered",kpi3sub:"▲ 23% vs last month",
    kpi4label:"Active Penalty Risk",kpi4val:"3",kpi4unit:"Exposures",kpi4sub:"Mexico · UK · Brazil",
    annualEmission:"Annual Emission Registry",systemAlerts:"System Alerts",criticalAlerts:"3 CRITICAL",
    complianceStatus:"Compliance Status — Regulatory Pipeline",activeItems:"5 ACTIVE",
    mod3eyebrow:"Module III",mod3title:"Cost Recovery & Leakage Optimizer",
    mod3meta:"Real-time factory floor monitoring · 14 active sensors · Last scan: 40s ago",
    commodityIndex:"Commodity Price Parity Index",greenCapital:"Green Capital Financing Gateway",
    pipeline:"$8.2M PIPELINE",application:"Application",
    mod4eyebrow:"Module IV",mod4title:"Sustainable Sourcing & Logistics Grid",
    mod4meta:"284 verified suppliers · 12 active contract negotiations · ECO-rated network",
    supplierMarket:"Supplier Marketplace — Recommended Vendors",ecoVerified:"ECO-VERIFIED",
    penaltyPredictor:"Penalty Predictor — Regulatory Risk Forecast",highRisk:"3 HIGH RISK",
    requestQuote:"Request Quote",penaltyProb:"PENALTY PROBABILITY",
    supplier:"Supplier",location:"Location",distance:"Distance",ecoRating:"ECO Rating",unitPrice:"Unit Price",
    scope1:"Scope 1 — Direct",scope2:"Scope 2 — Energy",scope3:"Scope 3 — Supply Chain",
    avgDelivery:"Avg. Delivery Distance",avgCarbon:"Avg. Carbon Rating",activeRfq:"Active RFQs",
    aiReportsEyebrow:"Module V · AI-Powered",aiReportsTitle:"Intelligent Report Generator",
    aiReportsMeta:"Claude AI · Instant regulatory & ESG reports · 40+ templates",
    generateReport:"GENERATE REPORT",reportType:"Report Type",selectTemplate:"Select template...",
    reportStatus:"GENERATING REPORT...",reportDone:"REPORT READY",reportDownload:"Download PDF",
    aiAnalysis:"AI Analysis",reportPromptPh:"Describe your report requirements...",
    creditsEyebrow:"Module VI",creditsTitle:"Carbon Credits Trading Desk",
    creditsMeta:"EU ETS · Gold Standard · VCS · CDM · Live market prices",
    buyCredits:"Buy Credits",sellCredits:"Sell Credits",creditPrice:"Credit Price",
    creditVol:"24h Volume",yourPortfolio:"Your Portfolio",totalCredits:"Total Credits",
    portfolioVal:"Portfolio Value",offsetGoal:"Offset Goal",pricingTitle:"Enterprise Plans",
    pricingSubtitle:"Transparent pricing for teams of all sizes",
    planStarter:"Starter",planGrowth:"Growth",planEnterprise:"Enterprise",planCustom:"Custom",
    perMonth:"/month",getStarted:"Get Started",contactSales:"Contact Sales",mostPopular:"MOST POPULAR",
  },
  ar:{
    appName:"جرين تشين",tagline:"سلاسل الإمداد.",taglineGreen:"خالية من الكربون.",
    systemAccess:"دخول النظام",gateway:"بوابة المؤسسة — الثقة الصفرية",
    enterpriseId:"معرف المؤسسة",passkey:"كلمة المرور",awaitHandshake:"في انتظار المصادقة الآمنة...",
    initiateSession:"بدء الجلسة",authenticating:"جارٍ المصادقة...",
    sso:"تسجيل الدخول عبر Azure AD / Okta / SAML 2.0",devBypass:"⚙ دخول المطور",
    devMode:"وضع المطور · غير مخصص للإنتاج",security:"AES-256 · TLS 1.3 · مصادقة ثنائية · SOC 2 TYPE II",
    build:"جرين تشين © 2025 · الإصدار v4.12.3",networkHealth:"صحة الشبكة",allNominal:"جميع الأنظمة تعمل",
    terminateSession:"إنهاء الجلسة",authenticated:"تم التحقق",enterpriseDashboard:"لوحة التحكم",
    coreModules:"الوحدات الأساسية",intelligence:"الذكاء",system:"النظام",commerce:"التجارة",
    navDashboard:"مصفوفة القيادة",navCompliance:"مركز الامتثال",navOptimizer:"محسّن التكاليف",
    navSourcing:"شبكة التوريد",navReports:"تقارير الذكاء الاصطناعي",navCredits:"أسواق الكربون",
    navSettings:"الإعدادات",navExports:"تصدير التدقيق",
    moduleUnderConstruction:"الوحدة قيد الإنشاء",
    navigateTo:"انتقل إلى لوحة التحكم أو المحسّن أو شبكة التوريد أو التقارير أو أسواق الكربون",
    initTelemetry:"جارٍ تهيئة مصفوفة القياس...",
    mod1eyebrow:"الوحدة الأولى · مباشر",mod1title:"مصفوفة القياس عن بُعد",
    mod1meta:"آخر مزامنة: 14 يونيو 2026 · 09:42 UTC · 3 تحذيرات تسرب نشطة",
    kpi1label:"انبعاثات النطاق 1",kpi1val:"١٢٬٤٨٠",kpi1unit:"tCO₂e",kpi1sub:"▼ 8.2% مقارنة بالربع الماضي",
    kpi2label:"التزام ضريبة الكربون",kpi2val:"$284K",kpi2unit:"حتى الآن",kpi2sub:"▲ 12% — تحديث EU CBAM",
    kpi3label:"التسرب المالي المُحتجز",kpi3val:"$1.4M",kpi3unit:"تم الاسترداد",kpi3sub:"▲ 23% مقارنة بالشهر الماضي",
    kpi4label:"مخاطر الغرامات النشطة",kpi4val:"3",kpi4unit:"تعرضات",kpi4sub:"المكسيك · المملكة المتحدة · البرازيل",
    annualEmission:"سجل الانبعاثات السنوي",systemAlerts:"تنبيهات النظام",criticalAlerts:"3 حرجة",
    complianceStatus:"حالة الامتثال — خط أنابيب تنظيمي",activeItems:"5 نشطة",
    mod3eyebrow:"الوحدة الثالثة",mod3title:"محسّن استرداد التكاليف والتسربات",
    mod3meta:"مراقبة أرضية المصنع في الوقت الفعلي · 14 مستشعراً · آخر فحص: 40 ثانية",
    commodityIndex:"مؤشر تعادل أسعار السلع",greenCapital:"بوابة تمويل رأس المال الأخضر",
    pipeline:"$8.2M في خط الأنابيب",application:"التقديم",
    mod4eyebrow:"الوحدة الرابعة",mod4title:"شبكة التوريد المستدام والخدمات اللوجستية",
    mod4meta:"284 مورداً موثقاً · 12 مفاوضة عقد نشطة · شبكة مصنفة ECO",
    supplierMarket:"سوق الموردين — الموردون الموصى بهم",ecoVerified:"موثق بيئياً",
    penaltyPredictor:"متنبئ الغرامات — توقعات المخاطر",highRisk:"3 مخاطر عالية",
    requestQuote:"طلب عرض سعر",penaltyProb:"احتمالية الغرامة",
    supplier:"المورد",location:"الموقع",distance:"المسافة",ecoRating:"تصنيف ECO",unitPrice:"سعر الوحدة",
    scope1:"النطاق 1 — المباشر",scope2:"النطاق 2 — الطاقة",scope3:"النطاق 3 — سلسلة التوريد",
    avgDelivery:"متوسط مسافة التوصيل",avgCarbon:"متوسط تصنيف الكربون",activeRfq:"طلبات الأسعار النشطة",
    aiReportsEyebrow:"الوحدة الخامسة · مدعوم بالذكاء الاصطناعي",aiReportsTitle:"مولّد التقارير الذكي",
    aiReportsMeta:"Claude AI · تقارير ESG والامتثال الفورية · أكثر من 40 قالب",
    generateReport:"إنشاء تقرير",reportType:"نوع التقرير",selectTemplate:"اختر قالباً...",
    reportStatus:"جارٍ إنشاء التقرير...",reportDone:"التقرير جاهز",reportDownload:"تحميل PDF",
    aiAnalysis:"تحليل الذكاء الاصطناعي",reportPromptPh:"صف متطلبات تقريرك...",
    creditsEyebrow:"الوحدة السادسة",creditsTitle:"منصة تداول أرصدة الكربون",
    creditsMeta:"EU ETS · Gold Standard · VCS · CDM · أسعار السوق المباشرة",
    buyCredits:"شراء أرصدة",sellCredits:"بيع أرصدة",creditPrice:"سعر الرصيد",
    creditVol:"حجم 24 ساعة",yourPortfolio:"محفظتك",totalCredits:"إجمالي الأرصدة",
    portfolioVal:"قيمة المحفظة",offsetGoal:"هدف التعويض",pricingTitle:"خطط المؤسسات",
    pricingSubtitle:"أسعار شفافة لفرق من جميع الأحجام",
    planStarter:"المبتدئ",planGrowth:"النمو",planEnterprise:"المؤسسات",planCustom:"مخصص",
    perMonth:"/شهرياً",getStarted:"ابدأ الآن",contactSales:"تواصل مع المبيعات",mostPopular:"الأكثر شيوعاً",
  },
  fr:{
    appName:"GREENCHAIN",tagline:"Chaînes d'approvisionnement.",taglineGreen:"Décarbonées.",
    systemAccess:"Accès Système",gateway:"PASSERELLE ENTREPRISE ZÉRO-CONFIANCE",
    enterpriseId:"ID Entreprise",passkey:"Mot de passe",awaitHandshake:"En attente de la poignée de main...",
    initiateSession:"LANCER LA SESSION",authenticating:"AUTHENTIFICATION...",
    sso:"SSO via Azure AD / Okta / SAML 2.0",devBypass:"⚙ BYPASS DEV",
    devMode:"MODE DÉVELOPPEUR · PAS POUR LA PRODUCTION",security:"AES-256 · TLS 1.3 · MFA ACTIVÉ · SOC 2 TYPE II",
    build:"GreenChain AI © 2025 · Build v4.12.3",networkHealth:"État du Réseau",allNominal:"TOUS LES SYSTÈMES NOMINAUX",
    terminateSession:"TERMINER LA SESSION",authenticated:"AUTHENTIFIÉ",enterpriseDashboard:"Tableau de Bord",
    coreModules:"MODULES PRINCIPAUX",intelligence:"INTELLIGENCE",system:"SYSTÈME",commerce:"COMMERCE",
    navDashboard:"Matrice de Commande",navCompliance:"Centre Conformité",navOptimizer:"Optimiseur de Coûts",
    navSourcing:"Grille d'Approvisionnement",navReports:"Rapports IA",navCredits:"Crédits Carbone",
    navSettings:"Configuration",navExports:"Exports d'Audit",
    moduleUnderConstruction:"MODULE EN CONSTRUCTION",
    navigateTo:"Naviguez vers Tableau de Bord, Optimiseur, Grille, Rapports IA ou Crédits Carbone",
    initTelemetry:"Initialisation de la matrice de télémétrie...",
    mod1eyebrow:"Module I · En direct",mod1title:"Matrice de Télémétrie de Commande",
    mod1meta:"Dernière sync: 14 Jun 2026 · 09:42 UTC · 3 alertes de fuite actives",
    kpi1label:"Émissions Scope 1",kpi1val:"12 480",kpi1unit:"tCO₂e",kpi1sub:"▼ 8,2% vs trimestre passé",
    kpi2label:"Passif Taxe Carbone",kpi2val:"$284K",kpi2unit:"YTD",kpi2sub:"▲ 12% — Mise à jour EU CBAM",
    kpi3label:"Fuite de Coûts Détectée",kpi3val:"$1,4M",kpi3unit:"Récupéré",kpi3sub:"▲ 23% vs mois passé",
    kpi4label:"Risque de Pénalité Actif",kpi4val:"3",kpi4unit:"Expositions",kpi4sub:"Mexique · UK · Brésil",
    annualEmission:"Registre Annuel des Émissions",systemAlerts:"Alertes Système",criticalAlerts:"3 CRITIQUES",
    complianceStatus:"Statut de Conformité — Pipeline Réglementaire",activeItems:"5 ACTIFS",
    mod3eyebrow:"Module III",mod3title:"Optimiseur de Récupération de Coûts",
    mod3meta:"Surveillance en temps réel · 14 capteurs actifs · Dernier scan: il y a 40s",
    commodityIndex:"Indice de Parité des Prix des Matières Premières",greenCapital:"Passerelle de Financement Vert",
    pipeline:"PIPELINE DE $8,2M",application:"Candidature",
    mod4eyebrow:"Module IV",mod4title:"Grille d'Approvisionnement Durable",
    mod4meta:"284 fournisseurs vérifiés · 12 négociations actives · Réseau ECO-noté",
    supplierMarket:"Marché Fournisseurs — Vendeurs Recommandés",ecoVerified:"ECO-VÉRIFIÉ",
    penaltyPredictor:"Prédicteur de Pénalités — Prévision des Risques",highRisk:"3 RISQUE ÉLEVÉ",
    requestQuote:"Demander un Devis",penaltyProb:"PROBABILITÉ DE PÉNALITÉ",
    supplier:"Fournisseur",location:"Localisation",distance:"Distance",ecoRating:"Note ECO",unitPrice:"Prix Unitaire",
    scope1:"Scope 1 — Direct",scope2:"Scope 2 — Énergie",scope3:"Scope 3 — Chaîne d'approvisionnement",
    avgDelivery:"Distance Livraison Moy.",avgCarbon:"Note Carbone Moy.",activeRfq:"RFQs Actifs",
    aiReportsEyebrow:"Module V · Propulsé par IA",aiReportsTitle:"Générateur de Rapports Intelligent",
    aiReportsMeta:"Claude AI · Rapports ESG et conformité instantanés · 40+ modèles",
    generateReport:"GÉNÉRER UN RAPPORT",reportType:"Type de Rapport",selectTemplate:"Choisir un modèle...",
    reportStatus:"GÉNÉRATION EN COURS...",reportDone:"RAPPORT PRÊT",reportDownload:"Télécharger PDF",
    aiAnalysis:"Analyse IA",reportPromptPh:"Décrivez vos exigences de rapport...",
    creditsEyebrow:"Module VI",creditsTitle:"Bureau de Trading de Crédits Carbone",
    creditsMeta:"EU ETS · Gold Standard · VCS · CDM · Prix du marché en direct",
    buyCredits:"Acheter",sellCredits:"Vendre",creditPrice:"Prix du Crédit",
    creditVol:"Volume 24h",yourPortfolio:"Votre Portefeuille",totalCredits:"Total Crédits",
    portfolioVal:"Valeur du Portefeuille",offsetGoal:"Objectif de Compensation",pricingTitle:"Plans Entreprise",
    pricingSubtitle:"Tarification transparente pour toutes les tailles d'équipes",
    planStarter:"Débutant",planGrowth:"Croissance",planEnterprise:"Entreprise",planCustom:"Personnalisé",
    perMonth:"/mois",getStarted:"Commencer",contactSales:"Contacter les Ventes",mostPopular:"LE PLUS POPULAIRE",
  },
  pt:{
    appName:"GREENCHAIN",tagline:"Cadeias de suprimento.",taglineGreen:"Descarbonizadas.",
    systemAccess:"Acesso ao Sistema",gateway:"GATEWAY EMPRESARIAL ZERO-CONFIANÇA",
    enterpriseId:"ID Empresarial",passkey:"Senha",awaitHandshake:"Aguardando handshake seguro...",
    initiateSession:"INICIAR SESSÃO",authenticating:"AUTENTICANDO...",
    sso:"SSO via Azure AD / Okta / SAML 2.0",devBypass:"⚙ BYPASS DEV",
    devMode:"MODO DESENVOLVEDOR · NÃO PARA PRODUÇÃO",security:"AES-256 · TLS 1.3 · MFA ATIVADO · SOC 2 TYPE II",
    build:"GreenChain AI © 2025 · Build v4.12.3",networkHealth:"Saúde da Rede",allNominal:"TODOS OS SISTEMAS NOMINAIS",
    terminateSession:"ENCERRAR SESSÃO",authenticated:"AUTENTICADO",enterpriseDashboard:"Painel Empresarial",
    coreModules:"MÓDULOS PRINCIPAIS",intelligence:"INTELIGÊNCIA",system:"SISTEMA",commerce:"COMÉRCIO",
    navDashboard:"Matriz de Comando",navCompliance:"Central de Conformidade",navOptimizer:"Otimizador de Custos",
    navSourcing:"Grade de Fornecimento",navReports:"Relatórios IA",navCredits:"Créditos de Carbono",
    navSettings:"Configurações",navExports:"Exportações de Auditoria",
    moduleUnderConstruction:"MÓDULO EM CONSTRUÇÃO",
    navigateTo:"Navegue para Painel, Otimizador, Grade, Relatórios IA ou Créditos de Carbono",
    initTelemetry:"Inicializando matriz de telemetria...",
    mod1eyebrow:"Módulo I · Ao Vivo",mod1title:"Matriz de Telemetria de Comando",
    mod1meta:"Última sincronização: 14 Jun 2026 · 09:42 UTC · 3 alertas de vazamento ativos",
    kpi1label:"Emissões Escopo 1",kpi1val:"12.480",kpi1unit:"tCO₂e",kpi1sub:"▼ 8,2% vs último trimestre",
    kpi2label:"Passivo Fiscal de Carbono",kpi2val:"$284K",kpi2unit:"No ano",kpi2sub:"▲ 12% — Atualização EU CBAM",
    kpi3label:"Vazamento Capturado",kpi3val:"$1,4M",kpi3unit:"Recuperado",kpi3sub:"▲ 23% vs mês passado",
    kpi4label:"Risco de Penalidade Ativo",kpi4val:"3",kpi4unit:"Exposições",kpi4sub:"México · UK · Brasil",
    annualEmission:"Registro Anual de Emissões",systemAlerts:"Alertas do Sistema",criticalAlerts:"3 CRÍTICOS",
    complianceStatus:"Status de Conformidade — Pipeline Regulatório",activeItems:"5 ATIVOS",
    mod3eyebrow:"Módulo III",mod3title:"Otimizador de Recuperação de Custos",
    mod3meta:"Monitoramento em tempo real · 14 sensores ativos · Último scan: 40s atrás",
    commodityIndex:"Índice de Paridade de Preço de Commodities",greenCapital:"Gateway de Financiamento Verde",
    pipeline:"PIPELINE DE $8,2M",application:"Candidatura",
    mod4eyebrow:"Módulo IV",mod4title:"Grade de Fornecimento Sustentável",
    mod4meta:"284 fornecedores verificados · 12 negociações ativas · Rede ECO-avaliada",
    supplierMarket:"Mercado de Fornecedores — Fornecedores Recomendados",ecoVerified:"ECO-VERIFICADO",
    penaltyPredictor:"Preditor de Penalidades — Previsão de Risco",highRisk:"3 ALTO RISCO",
    requestQuote:"Solicitar Cotação",penaltyProb:"PROBABILIDADE DE PENALIDADE",
    supplier:"Fornecedor",location:"Localização",distance:"Distância",ecoRating:"Avaliação ECO",unitPrice:"Preço Unitário",
    scope1:"Escopo 1 — Direto",scope2:"Escopo 2 — Energia",scope3:"Escopo 3 — Cadeia de Suprimento",
    avgDelivery:"Dist. Média de Entrega",avgCarbon:"Avaliação Média de Carbono",activeRfq:"RFQs Ativos",
    aiReportsEyebrow:"Módulo V · Powered by IA",aiReportsTitle:"Gerador Inteligente de Relatórios",
    aiReportsMeta:"Claude AI · Relatórios ESG e conformidade instantâneos · 40+ modelos",
    generateReport:"GERAR RELATÓRIO",reportType:"Tipo de Relatório",selectTemplate:"Selecionar modelo...",
    reportStatus:"GERANDO RELATÓRIO...",reportDone:"RELATÓRIO PRONTO",reportDownload:"Baixar PDF",
    aiAnalysis:"Análise de IA",reportPromptPh:"Descreva seus requisitos de relatório...",
    creditsEyebrow:"Módulo VI",creditsTitle:"Mesa de Negociação de Créditos de Carbono",
    creditsMeta:"EU ETS · Gold Standard · VCS · CDM · Preços de mercado ao vivo",
    buyCredits:"Comprar",sellCredits:"Vender",creditPrice:"Preço do Crédito",
    creditVol:"Volume 24h",yourPortfolio:"Seu Portfólio",totalCredits:"Total de Créditos",
    portfolioVal:"Valor do Portfólio",offsetGoal:"Meta de Compensação",pricingTitle:"Planos Empresariais",
    pricingSubtitle:"Preços transparentes para equipes de todos os tamanhos",
    planStarter:"Inicial",planGrowth:"Crescimento",planEnterprise:"Empresarial",planCustom:"Personalizado",
    perMonth:"/mês",getStarted:"Começar",contactSales:"Contatar Vendas",mostPopular:"MAIS POPULAR",
  },
  zh:{
    appName:"绿链 AI",tagline:"供应链。",taglineGreen:"脱碳化。",
    systemAccess:"系统访问",gateway:"零信任企业网关",
    enterpriseId:"企业账号",passkey:"密码",awaitHandshake:"等待安全握手验证...",
    initiateSession:"启动会话",authenticating:"认证中...",
    sso:"通过 Azure AD / Okta / SAML 2.0 单点登录",devBypass:"⚙ 开发者通道",
    devMode:"开发者模式 · 不用于生产环境",security:"AES-256 · TLS 1.3 · 双重认证 · SOC 2 TYPE II",
    build:"GreenChain AI © 2025 · 版本 v4.12.3",networkHealth:"网络状态",allNominal:"所有系统运行正常",
    terminateSession:"终止会话",authenticated:"已认证",enterpriseDashboard:"企业控制台",
    coreModules:"核心模块",intelligence:"智能",system:"系统",commerce:"商务",
    navDashboard:"指挥矩阵",navCompliance:"合规中心",navOptimizer:"成本优化器",
    navSourcing:"采购网格",navReports:"AI 报告",navCredits:"碳信用交易",
    navSettings:"系统配置",navExports:"审计导出",
    moduleUnderConstruction:"模块建设中",
    navigateTo:"导航至控制台、优化器、采购网格、AI报告或碳信用交易",
    initTelemetry:"正在初始化遥测矩阵...",
    mod1eyebrow:"模块一 · 实时",mod1title:"指挥遥测矩阵",
    mod1meta:"上次同步：2026年6月14日 · 09:42 UTC · 3条活跃泄漏警告",
    kpi1label:"范围1排放量",kpi1val:"12,480",kpi1unit:"tCO₂e",kpi1sub:"▼ 8.2% 较上季度",
    kpi2label:"碳税负债",kpi2val:"$284K",kpi2unit:"年初至今",kpi2sub:"▲ 12% — EU CBAM更新",
    kpi3label:"已捕获成本泄漏",kpi3val:"$1.4M",kpi3unit:"已追回",kpi3sub:"▲ 23% 较上月",
    kpi4label:"活跃罚款风险",kpi4val:"3",kpi4unit:"风险敞口",kpi4sub:"墨西哥 · 英国 · 巴西",
    annualEmission:"年度排放登记",systemAlerts:"系统警报",criticalAlerts:"3 条严重警报",
    complianceStatus:"合规状态 — 监管管道",activeItems:"5 项活跃",
    mod3eyebrow:"模块三",mod3title:"成本回收与泄漏优化器",
    mod3meta:"工厂实时监控 · 14个活跃传感器 · 最后扫描：40秒前",
    commodityIndex:"大宗商品价格平价指数",greenCapital:"绿色资本融资网关",
    pipeline:"$8.2M 融资管道",application:"申请进度",
    mod4eyebrow:"模块四",mod4title:"可持续采购与物流网格",
    mod4meta:"284家认证供应商 · 12项合同谈判进行中 · ECO评级网络",
    supplierMarket:"供应商市场 — 推荐供应商",ecoVerified:"ECO认证",
    penaltyPredictor:"罚款预测器 — 监管风险预测",highRisk:"3 高风险",
    requestQuote:"申请报价",penaltyProb:"罚款概率",
    supplier:"供应商",location:"位置",distance:"距离",ecoRating:"ECO评级",unitPrice:"单价",
    scope1:"范围1 — 直接排放",scope2:"范围2 — 能源",scope3:"范围3 — 供应链",
    avgDelivery:"平均配送距离",avgCarbon:"平均碳评级",activeRfq:"活跃询价单",
    aiReportsEyebrow:"模块五 · AI驱动",aiReportsTitle:"智能报告生成器",
    aiReportsMeta:"Claude AI · 即时ESG与合规报告 · 40+模板",
    generateReport:"生成报告",reportType:"报告类型",selectTemplate:"选择模板...",
    reportStatus:"正在生成报告...",reportDone:"报告已就绪",reportDownload:"下载 PDF",
    aiAnalysis:"AI分析",reportPromptPh:"描述您的报告需求...",
    creditsEyebrow:"模块六",creditsTitle:"碳信用交易台",
    creditsMeta:"EU ETS · Gold Standard · VCS · CDM · 实时市场价格",
    buyCredits:"购买",sellCredits:"出售",creditPrice:"信用价格",
    creditVol:"24小时成交量",yourPortfolio:"您的投资组合",totalCredits:"总信用额度",
    portfolioVal:"投资组合价值",offsetGoal:"抵消目标",pricingTitle:"企业方案",
    pricingSubtitle:"适合各种规模团队的透明定价",
    planStarter:"入门版",planGrowth:"成长版",planEnterprise:"企业版",planCustom:"定制版",
    perMonth:"/月",getStarted:"立即开始",contactSales:"联系销售",mostPopular:"最受欢迎",
  },
  ru:{
    appName:"GREENCHAIN",tagline:"Цепочки поставок.",taglineGreen:"Декарбонизированные.",
    systemAccess:"Доступ к системе",gateway:"КОРПОРАТИВНЫЙ ШЛЮЗ НУЛЕВОГО ДОВЕРИЯ",
    enterpriseId:"Корпоративный ID",passkey:"Пароль",awaitHandshake:"Ожидание безопасного рукопожатия...",
    initiateSession:"НАЧАТЬ СЕССИЮ",authenticating:"АУТЕНТИФИКАЦИЯ...",
    sso:"SSO через Azure AD / Okta / SAML 2.0",devBypass:"⚙ ОБХОД РАЗРАБОТЧИКА",
    devMode:"РЕЖИМ РАЗРАБОТЧИКА · НЕ ДЛЯ ПРОДАКШНА",security:"AES-256 · TLS 1.3 · MFA · SOC 2 TYPE II",
    build:"GreenChain AI © 2025 · Сборка v4.12.3",networkHealth:"Состояние сети",allNominal:"ВСЕ СИСТЕМЫ В НОРМЕ",
    terminateSession:"ЗАВЕРШИТЬ СЕССИЮ",authenticated:"АУТЕНТИФИЦИРОВАН",enterpriseDashboard:"Корпоративная Панель",
    coreModules:"ОСНОВНЫЕ МОДУЛИ",intelligence:"АНАЛИТИКА",system:"СИСТЕМА",commerce:"КОММЕРЦИЯ",
    navDashboard:"Командная матрица",navCompliance:"Центр соответствия",navOptimizer:"Оптимизатор затрат",
    navSourcing:"Сеть поставок",navReports:"Отчёты ИИ",navCredits:"Торговля углеродом",
    navSettings:"Конфигурация",navExports:"Экспорт аудита",
    moduleUnderConstruction:"МОДУЛЬ В РАЗРАБОТКЕ",
    navigateTo:"Перейдите в Панель, Оптимизатор, Сеть поставок, Отчёты ИИ или Торговлю углеродом",
    initTelemetry:"Инициализация матрицы телеметрии...",
    mod1eyebrow:"Модуль I · В реальном времени",mod1title:"Командная матрица телеметрии",
    mod1meta:"Последняя синхронизация: 14 июн 2026 · 09:42 UTC · 3 предупреждения об утечках",
    kpi1label:"Выбросы Scope 1",kpi1val:"12 480",kpi1unit:"tCO₂e",kpi1sub:"▼ 8,2% к прошлому кварталу",
    kpi2label:"Обязательства по налогу на CO₂",kpi2val:"$284K",kpi2unit:"ЗА ГОД",kpi2sub:"▲ 12% — Обновление EU CBAM",
    kpi3label:"Выявленные утечки затрат",kpi3val:"$1,4M",kpi3unit:"Возвращено",kpi3sub:"▲ 23% к прошлому месяцу",
    kpi4label:"Активный риск штрафов",kpi4val:"3",kpi4unit:"Позиции",kpi4sub:"Мексика · Великобритания · Бразилия",
    annualEmission:"Годовой реестр выбросов",systemAlerts:"Системные оповещения",criticalAlerts:"3 КРИТИЧЕСКИХ",
    complianceStatus:"Статус соответствия — Регуляторный конвейер",activeItems:"5 АКТИВНЫХ",
    mod3eyebrow:"Модуль III",mod3title:"Оптимизатор возврата затрат и утечек",
    mod3meta:"Мониторинг цеха в реальном времени · 14 датчиков · Последнее сканирование: 40с назад",
    commodityIndex:"Индекс ценового паритета сырьевых товаров",greenCapital:"Шлюз зелёного финансирования",
    pipeline:"КОНВЕЙЕР $8,2М",application:"Заявка",
    mod4eyebrow:"Модуль IV",mod4title:"Сеть устойчивых поставок и логистики",
    mod4meta:"284 верифицированных поставщика · 12 активных переговоров · Сеть с ECO-рейтингом",
    supplierMarket:"Торговая площадка поставщиков — Рекомендуемые",ecoVerified:"ECO-ВЕРИФИЦИРОВАНО",
    penaltyPredictor:"Предиктор штрафов — Прогноз регуляторного риска",highRisk:"3 ВЫСОКИЙ РИСК",
    requestQuote:"Запросить котировку",penaltyProb:"ВЕРОЯТНОСТЬ ШТРАФА",
    supplier:"Поставщик",location:"Локация",distance:"Расстояние",ecoRating:"ECO рейтинг",unitPrice:"Цена за ед.",
    scope1:"Scope 1 — Прямые",scope2:"Scope 2 — Энергия",scope3:"Scope 3 — Цепочка поставок",
    avgDelivery:"Ср. расстояние доставки",avgCarbon:"Ср. углеродный рейтинг",activeRfq:"Активных RFQ",
    aiReportsEyebrow:"Модуль V · На базе ИИ",aiReportsTitle:"Интеллектуальный генератор отчётов",
    aiReportsMeta:"Claude AI · Мгновенные ESG и отчёты о соответствии · 40+ шаблонов",
    generateReport:"СОЗДАТЬ ОТЧЁТ",reportType:"Тип отчёта",selectTemplate:"Выбрать шаблон...",
    reportStatus:"СОЗДАНИЕ ОТЧЁТА...",reportDone:"ОТЧЁТ ГОТОВ",reportDownload:"Скачать PDF",
    aiAnalysis:"Анализ ИИ",reportPromptPh:"Опишите требования к отчёту...",
    creditsEyebrow:"Модуль VI",creditsTitle:"Торговый стол углеродными кредитами",
    creditsMeta:"EU ETS · Gold Standard · VCS · CDM · Цены рынка в реальном времени",
    buyCredits:"Купить",sellCredits:"Продать",creditPrice:"Цена кредита",
    creditVol:"Объём за 24ч",yourPortfolio:"Ваш портфель",totalCredits:"Всего кредитов",
    portfolioVal:"Стоимость портфеля",offsetGoal:"Цель компенсации",pricingTitle:"Корпоративные тарифы",
    pricingSubtitle:"Прозрачные цены для команд любого размера",
    planStarter:"Стартовый",planGrowth:"Рост",planEnterprise:"Корпоративный",planCustom:"Индивидуальный",
    perMonth:"/мес",getStarted:"Начать",contactSales:"Связаться с продажами",mostPopular:"САМЫЙ ПОПУЛЯРНЫЙ",
  },
  de:{
    appName:"GREENCHAIN",tagline:"Lieferketten.",taglineGreen:"Dekarbonisiert.",
    systemAccess:"Systemzugang",gateway:"ZERO-TRUST UNTERNEHMENS-GATEWAY",
    enterpriseId:"Unternehmens-ID",passkey:"Passwort",awaitHandshake:"Warte auf sicheren Handshake...",
    initiateSession:"SITZUNG STARTEN",authenticating:"AUTHENTIFIZIERUNG...",
    sso:"SSO über Azure AD / Okta / SAML 2.0",devBypass:"⚙ ENTWICKLER-BYPASS",
    devMode:"ENTWICKLERMODUS · NICHT FÜR PRODUKTION",security:"AES-256 · TLS 1.3 · MFA · SOC 2 TYPE II",
    build:"GreenChain AI © 2025 · Build v4.12.3",networkHealth:"Netzwerkstatus",allNominal:"ALLE SYSTEME NOMINAL",
    terminateSession:"SITZUNG BEENDEN",authenticated:"AUTHENTIFIZIERT",enterpriseDashboard:"Unternehmens-Dashboard",
    coreModules:"KERNMODULE",intelligence:"INTELLIGENZ",system:"SYSTEM",commerce:"HANDEL",
    navDashboard:"Befehlsmatrix",navCompliance:"Compliance-Kern",navOptimizer:"Kostenoptimierer",
    navSourcing:"Beschaffungsraster",navReports:"KI-Berichte",navCredits:"CO₂-Handel",
    navSettings:"Konfiguration",navExports:"Audit-Exporte",
    moduleUnderConstruction:"MODUL IN ENTWICKLUNG",
    navigateTo:"Navigieren Sie zu Dashboard, Optimierer, Beschaffung, KI-Berichte oder CO₂-Handel",
    initTelemetry:"Telemetrie-Matrix wird initialisiert...",
    mod1eyebrow:"Modul I · Live",mod1title:"Befehls-Telemetrie-Matrix",
    mod1meta:"Letzte Sync: 14. Jun 2026 · 09:42 UTC · 3 aktive Leckwarnungen",
    kpi1label:"Scope-1-Emissionen",kpi1val:"12.480",kpi1unit:"tCO₂e",kpi1sub:"▼ 8,2% ggü. letztem Quartal",
    kpi2label:"CO₂-Steuerverbindlichkeit",kpi2val:"$284K",kpi2unit:"YTD",kpi2sub:"▲ 12% — EU-CBAM-Update",
    kpi3label:"Erfasste Kostenlecks",kpi3val:"$1,4M",kpi3unit:"Zurückgewonnen",kpi3sub:"▲ 23% ggü. letztem Monat",
    kpi4label:"Aktives Strafrisiko",kpi4val:"3",kpi4unit:"Expositionen",kpi4sub:"Mexiko · UK · Brasilien",
    annualEmission:"Jährliches Emissionsregister",systemAlerts:"Systemwarnungen",criticalAlerts:"3 KRITISCH",
    complianceStatus:"Compliance-Status — Regulatorische Pipeline",activeItems:"5 AKTIV",
    mod3eyebrow:"Modul III",mod3title:"Kostenrückgewinnung & Leck-Optimierer",
    mod3meta:"Echtzeit-Fabriküberwachung · 14 aktive Sensoren · Letzter Scan: vor 40s",
    commodityIndex:"Rohstoffpreisparitäts-Index",greenCapital:"Green-Capital-Finanzierungs-Gateway",
    pipeline:"$8,2M PIPELINE",application:"Bewerbung",
    mod4eyebrow:"Modul IV",mod4title:"Nachhaltiges Beschaffungs- & Logistikraster",
    mod4meta:"284 verifizierte Lieferanten · 12 aktive Verhandlungen · ECO-bewertetes Netzwerk",
    supplierMarket:"Lieferantenmarktplatz — Empfohlene Anbieter",ecoVerified:"ECO-VERIFIZIERT",
    penaltyPredictor:"Strafprognose — Regulatorische Risikoprognose",highRisk:"3 HOHES RISIKO",
    requestQuote:"Angebot anfordern",penaltyProb:"STRAFWAHRSCHEINLICHKEIT",
    supplier:"Lieferant",location:"Standort",distance:"Entfernung",ecoRating:"ECO-Bewertung",unitPrice:"Stückpreis",
    scope1:"Scope 1 — Direkt",scope2:"Scope 2 — Energie",scope3:"Scope 3 — Lieferkette",
    avgDelivery:"Ø Lieferentfernung",avgCarbon:"Ø Carbon-Bewertung",activeRfq:"Aktive Anfragen",
    aiReportsEyebrow:"Modul V · KI-gestützt",aiReportsTitle:"Intelligenter Berichtsgenerator",
    aiReportsMeta:"Claude AI · Sofortige ESG- und Compliance-Berichte · 40+ Vorlagen",
    generateReport:"BERICHT ERSTELLEN",reportType:"Berichtstyp",selectTemplate:"Vorlage auswählen...",
    reportStatus:"BERICHT WIRD ERSTELLT...",reportDone:"BERICHT BEREIT",reportDownload:"PDF herunterladen",
    aiAnalysis:"KI-Analyse",reportPromptPh:"Beschreiben Sie Ihre Berichtsanforderungen...",
    creditsEyebrow:"Modul VI",creditsTitle:"CO₂-Zertifikate Handelsplatz",
    creditsMeta:"EU ETS · Gold Standard · VCS · CDM · Live-Marktpreise",
    buyCredits:"Kaufen",sellCredits:"Verkaufen",creditPrice:"Kreditpreis",
    creditVol:"24h-Volumen",yourPortfolio:"Ihr Portfolio",totalCredits:"Gesamt-Zertifikate",
    portfolioVal:"Portfoliowert",offsetGoal:"Ausgleichsziel",pricingTitle:"Unternehmenspläne",
    pricingSubtitle:"Transparente Preise für Teams jeder Größe",
    planStarter:"Starter",planGrowth:"Wachstum",planEnterprise:"Enterprise",planCustom:"Individuell",
    perMonth:"/Monat",getStarted:"Loslegen",contactSales:"Vertrieb kontaktieren",mostPopular:"AM BELIEBTESTEN",
  },
};

// ── CONTEXT ────────────────────────────────────────────────────
const LangCtx = createContext({ lang:"en", t:TR.en, rtl:false });
const useLang = () => useContext(LangCtx);

// ── CSS ────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@300;400;500;600;700&family=Exo+2:wght@300;400;500;600;700&display=swap');

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{font-size:14px;}
  body{background:${T.bg};color:${T.textPri};font-family:${T.fontBody};min-height:100vh;overflow:hidden;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:${T.borderHi};}

  /* ── ANIMATIONS ── */
  @keyframes scanline{0%{transform:translateY(-100%);}100%{transform:translateY(200vh);}}
  @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
  @keyframes glow-pulse{0%,100%{opacity:.6;}50%{opacity:1;}}
  @keyframes slide-up{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
  @keyframes slide-in-r{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);}}
  @keyframes spin{to{transform:rotate(360deg);}}
  @keyframes ping{0%{transform:scale(1);opacity:.8;}100%{transform:scale(2.2);opacity:0;}}
  @keyframes border-flow{0%,100%{border-color:${T.border};}50%{border-color:${T.green}44;}}
  @keyframes data-flicker{0%,100%{opacity:1;}92%{opacity:1;}93%{opacity:.3;}96%{opacity:1;}98%{opacity:.5;}99%{opacity:1;}}
  @keyframes typing{from{width:0;}to{width:100%;}}
  @keyframes hud-appear{from{opacity:0;transform:scale(.97);}to{opacity:1;transform:scale(1);}}
  @keyframes number-tick{from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);}}

  /* ── LAYOUT ── */
  .gc-root{display:flex;height:100vh;overflow:hidden;background:${T.bg};position:relative;}
  .gc-root::before{content:'';position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.08) 2px,rgba(0,0,0,.08) 4px);pointer-events:none;z-index:9999;}
  .gc-scanline{position:fixed;inset-x:0;height:80px;background:linear-gradient(transparent,rgba(0,255,136,.015),transparent);animation:scanline 8s linear infinite;pointer-events:none;z-index:9998;}

  /* ── SIDEBAR ── */
  .gc-sidebar{width:230px;flex-shrink:0;background:${T.surface};border-right:1px solid ${T.border};display:flex;flex-direction:column;position:relative;overflow:hidden;}
  [dir="rtl"] .gc-sidebar{border-right:none;border-left:1px solid ${T.border};}
  .gc-sidebar-glow{position:absolute;top:0;right:0;width:1px;height:100%;background:linear-gradient(180deg,transparent 0%,${T.green}55 40%,${T.teal}33 60%,transparent 100%);animation:glow-pulse 3s ease-in-out infinite;}
  [dir="rtl"] .gc-sidebar-glow{right:auto;left:0;}

  .gc-logo{padding:20px 18px 16px;border-bottom:1px solid ${T.border};position:relative;}
  .gc-logo-hex{width:34px;height:34px;border:1.5px solid ${T.green};display:flex;align-items:center;justify-content:center;margin-bottom:10px;position:relative;clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);}
  .gc-logo-hex::before{content:'';position:absolute;inset:2px;background:${T.greenDeep};clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);}
  .gc-logo-hex-inner{font-family:${T.fontDisplay};font-size:11px;font-weight:900;color:${T.green};position:relative;z-index:1;}
  .gc-logo-name{font-family:${T.fontDisplay};font-size:12px;font-weight:700;color:${T.green};letter-spacing:3px;text-transform:uppercase;}
  .gc-logo-ver{font-family:${T.fontMono};font-size:8px;color:${T.textMute};letter-spacing:2px;margin-top:3px;}

  .gc-nav{flex:1;padding:10px 0;overflow-y:auto;}
  .gc-nav-section{font-family:${T.fontMono};font-size:8px;letter-spacing:3px;color:${T.textMute};padding:14px 18px 5px;text-transform:uppercase;}
  .gc-nav-item{display:flex;align-items:center;gap:8px;padding:8px 18px;cursor:pointer;font-family:${T.fontBody};font-size:12px;font-weight:500;color:${T.textSec};border-left:2px solid transparent;transition:all .15s;position:relative;}
  [dir="rtl"] .gc-nav-item{border-left:none;border-right:2px solid transparent;}
  .gc-nav-item:hover{background:${T.greenDeep};color:${T.textPri};}
  .gc-nav-item.active{color:${T.green};border-left-color:${T.green};background:rgba(0,255,136,.06);}
  [dir="rtl"] .gc-nav-item.active{border-left-color:transparent;border-right-color:${T.green};}
  .gc-nav-icon{font-size:13px;width:18px;text-align:center;flex-shrink:0;}
  .gc-nav-badge{margin-left:auto;background:rgba(255,51,85,.15);color:${T.red};font-family:${T.fontMono};font-size:9px;padding:1px 6px;border:1px solid rgba(255,51,85,.3);}
  [dir="rtl"] .gc-nav-badge{margin-left:0;margin-right:auto;}
  .gc-nav-new{margin-left:auto;background:rgba(0,212,170,.12);color:${T.teal};font-family:${T.fontMono};font-size:8px;padding:1px 5px;border:1px solid rgba(0,212,170,.3);}

  .gc-sidebar-footer{padding:14px 18px;border-top:1px solid ${T.border};}
  .gc-status-row{display:flex;align-items:center;gap:8px;font-family:${T.fontMono};font-size:9px;color:${T.textMute};}
  .gc-status-dot-wrap{position:relative;width:8px;height:8px;flex-shrink:0;}
  .gc-status-dot{width:8px;height:8px;border-radius:50%;background:${T.green};}
  .gc-status-ping{position:absolute;inset:0;border-radius:50%;background:${T.green};animation:ping 2s ease-out infinite;}
  .gc-logout{margin-top:10px;font-family:${T.fontMono};font-size:9px;color:${T.textMute};cursor:pointer;letter-spacing:1px;text-transform:uppercase;transition:color .15s;}
  .gc-logout:hover{color:${T.red};}

  /* ── MAIN ── */
  .gc-main{flex:1;overflow-y:auto;background:${T.bg};display:flex;flex-direction:column;}

  /* ── TOPBAR ── */
  .gc-topbar{display:flex;align-items:center;justify-content:space-between;padding:12px 24px;border-bottom:1px solid ${T.border};background:${T.surface};position:sticky;top:0;z-index:10;}
  .gc-topbar-left{font-family:${T.fontMono};font-size:10px;color:${T.textMute};letter-spacing:1px;display:flex;align-items:center;gap:8px;}
  .gc-topbar-crumb{color:${T.textSec};}
  .gc-auth-pill{background:rgba(0,255,136,.08);color:${T.green};font-family:${T.fontMono};font-size:8px;padding:2px 10px;border:1px solid rgba(0,255,136,.3);letter-spacing:2px;animation:border-flow 3s infinite;}
  .gc-topbar-right{display:flex;align-items:center;gap:10px;}
  .gc-icon-btn{width:30px;height:30px;border:1px solid ${T.border};background:${T.panel};display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;color:${T.textSec};transition:all .15s;position:relative;}
  .gc-icon-btn:hover{border-color:${T.green};color:${T.green};}
  .gc-alert-pip{position:absolute;top:4px;right:4px;width:5px;height:5px;background:${T.red};border-radius:50%;}
  .gc-avatar{width:28px;height:28px;border:1.5px solid ${T.borderHi};background:linear-gradient(135deg,#0d2a1a,#060d0a);display:flex;align-items:center;justify-content:center;font-family:${T.fontMono};font-size:9px;color:${T.green};cursor:pointer;font-weight:700;}
  .gc-content{padding:22px 24px;flex:1;}

  /* ── PAGE HEADER ── */
  .gc-page-header{margin-bottom:22px;}
  .gc-page-eyebrow{font-family:${T.fontMono};font-size:9px;letter-spacing:3px;color:${T.teal};text-transform:uppercase;margin-bottom:6px;}
  .gc-page-title{font-family:${T.fontDisplay};font-size:19px;font-weight:700;color:${T.textPri};letter-spacing:.5px;line-height:1.2;}
  .gc-page-meta{font-family:${T.fontMono};font-size:9px;color:${T.textMute};margin-top:5px;}

  /* ── KPI ROW ── */
  .gc-kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px;}
  .gc-kpi{background:${T.surface};border:1px solid ${T.border};padding:16px 18px;position:relative;overflow:hidden;animation:slide-up .4s ease both;transition:border-color .2s;}
  .gc-kpi:hover{border-color:${T.borderHi};}
  .gc-kpi::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${T.green}66,transparent);}
  .gc-kpi.warn::before{background:linear-gradient(90deg,transparent,${T.amber}66,transparent);}
  .gc-kpi.danger::before{background:linear-gradient(90deg,transparent,${T.red}66,transparent);}
  .gc-kpi-label{font-family:${T.fontMono};font-size:8px;letter-spacing:2px;color:${T.textMute};text-transform:uppercase;margin-bottom:10px;}
  .gc-kpi-value{font-family:${T.fontDisplay};font-size:26px;font-weight:700;color:${T.textPri};line-height:1;margin-bottom:6px;animation:number-tick .5s ease both;}
  .gc-kpi-value.green{color:${T.green};text-shadow:0 0 20px rgba(0,255,136,.3);}
  .gc-kpi-value.amber{color:${T.amber};}
  .gc-kpi-value.red{color:${T.red};}
  .gc-kpi-unit{font-family:${T.fontMono};font-size:9px;color:${T.textMute};margin-bottom:6px;}
  .gc-kpi-sub{font-family:${T.fontMono};font-size:9px;color:${T.textMute};}
  .gc-kpi-sub.up{color:${T.green};}.gc-kpi-sub.down{color:${T.red};}

  /* ── PANELS ── */
  .gc-panel{background:${T.surface};border:1px solid ${T.border};animation:slide-up .4s ease both;transition:border-color .2s;}
  .gc-panel:hover{border-color:${T.borderHi};}
  .gc-panel-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid ${T.border};}
  .gc-panel-title{font-family:${T.fontMono};font-size:9px;letter-spacing:2.5px;color:${T.textSec};text-transform:uppercase;}
  .gc-panel-badge{font-family:${T.fontMono};font-size:8px;padding:2px 8px;border:1px solid ${T.border};color:${T.textMute};letter-spacing:1px;text-transform:uppercase;}
  .gc-panel-badge.live{border-color:${T.green}44;color:${T.green};background:${T.greenDeep};animation:border-flow 2s infinite;}
  .gc-panel-body{padding:16px;}
  .gc-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;}
  .gc-grid-3{display:grid;grid-template-columns:2fr 1fr;gap:12px;margin-bottom:12px;}

  /* ── CHARTS ── */
  .gc-chart-bars{display:flex;align-items:flex-end;gap:5px;height:90px;padding-bottom:4px;}
  .gc-bar-wrap{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;}
  .gc-bar{width:100%;background:linear-gradient(180deg,${T.green}bb,${T.green}33);border:1px solid ${T.green}55;transition:height .5s cubic-bezier(.4,0,.2,1);position:relative;cursor:pointer;}
  .gc-bar.dim{background:linear-gradient(180deg,${T.borderHi},${T.border});border-color:${T.border};}
  .gc-bar:hover{background:linear-gradient(180deg,${T.green},${T.green}55);border-color:${T.green};}
  .gc-bar:hover::after{content:attr(data-val);position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-family:${T.fontMono};font-size:8px;color:${T.green};white-space:nowrap;background:${T.panel};padding:2px 6px;border:1px solid ${T.border};}
  .gc-bar-label{font-family:${T.fontMono};font-size:7px;color:${T.textMute};}

  /* ── SCOPE BARS ── */
  .gc-scope-list{display:flex;flex-direction:column;gap:12px;margin-top:14px;}
  .gc-scope-header{display:flex;justify-content:space-between;margin-bottom:5px;font-size:11px;}
  .gc-scope-name{color:${T.textSec};font-weight:500;font-family:${T.fontBody};}
  .gc-scope-val{font-family:${T.fontMono};font-size:9px;color:${T.textMute};}
  .gc-scope-track{height:3px;background:${T.border};position:relative;}
  .gc-scope-fill{height:100%;transition:width .9s cubic-bezier(.4,0,.2,1);position:relative;}
  .gc-scope-fill::after{content:'';position:absolute;right:-4px;top:-3px;width:8px;height:8px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor;}

  /* ── ALERTS ── */
  .gc-alert-feed{display:flex;flex-direction:column;}
  .gc-alert-item{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid ${T.border}44;}
  .gc-alert-item:last-child{border-bottom:none;}
  .gc-alert-icon{width:26px;height:26px;border:1px solid;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;}
  .gc-alert-icon.warn{border-color:${T.amber}44;color:${T.amber};background:rgba(255,170,0,.08);}
  .gc-alert-icon.ok{border-color:${T.green}44;color:${T.green};background:${T.greenDeep};}
  .gc-alert-icon.crit{border-color:${T.red}44;color:${T.red};background:rgba(255,51,85,.08);}
  .gc-alert-msg{font-size:11px;color:${T.textPri};line-height:1.4;font-weight:500;}
  .gc-alert-time{font-family:${T.fontMono};font-size:8px;color:${T.textMute};margin-top:2px;}

  /* ── TIMELINE ── */
  .gc-timeline{position:relative;padding-left:16px;}
  [dir="rtl"] .gc-timeline{padding-left:0;padding-right:16px;}
  .gc-timeline::before{content:'';position:absolute;left:4px;top:0;bottom:0;width:1px;background:linear-gradient(180deg,${T.green}55,${T.border});}
  [dir="rtl"] .gc-timeline::before{left:auto;right:4px;}
  .gc-tl-item{position:relative;margin-bottom:16px;}
  .gc-tl-dot{position:absolute;left:-15px;top:3px;width:6px;height:6px;border-radius:50%;border:1px solid;}
  [dir="rtl"] .gc-tl-dot{left:auto;right:-15px;}
  .gc-tl-dot.done{background:${T.green};border-color:${T.green};box-shadow:0 0 8px ${T.green};}
  .gc-tl-dot.pend{background:transparent;border-color:${T.amber};}
  .gc-tl-dot.alert{background:${T.red};border-color:${T.red};animation:ping 1.5s infinite;}
  .gc-tl-label{font-size:11px;font-weight:600;color:${T.textPri};font-family:${T.fontBody};}
  .gc-tl-desc{font-family:${T.fontMono};font-size:9px;color:${T.textMute};margin-top:2px;}

  /* ── OPTIMIZER CARDS ── */
  .gc-optimizer-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:12px;}
  .gc-opt-card{background:${T.panel};border:1px solid ${T.border};padding:14px;transition:all .2s;cursor:default;}
  .gc-opt-card:hover{border-color:${T.borderHi};background:${T.surface};}
  .gc-opt-icon{font-size:18px;margin-bottom:8px;}
  .gc-opt-label{font-family:${T.fontMono};font-size:8px;letter-spacing:1.5px;color:${T.textMute};text-transform:uppercase;margin-bottom:4px;}
  .gc-opt-val{font-family:${T.fontDisplay};font-size:20px;font-weight:700;color:${T.textPri};margin-bottom:3px;}
  .gc-opt-sub{font-family:${T.fontMono};font-size:9px;color:${T.textMute};}

  /* ── MARKET ROWS ── */
  .gc-mkt-row{display:flex;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid ${T.border}33;}
  .gc-mkt-row:last-child{border-bottom:none;}
  .gc-mkt-name{flex:1;font-size:12px;color:${T.textPri};font-weight:500;}
  .gc-mkt-price{font-family:${T.fontMono};font-size:11px;color:${T.textSec};width:70px;text-align:right;}
  .gc-mkt-change{font-family:${T.fontMono};font-size:10px;width:50px;text-align:right;}
  .gc-sparkline{width:56px;height:22px;flex-shrink:0;}
  .gc-green{color:${T.green};}.gc-red{color:${T.red};}

  /* ── GRANTS ── */
  .gc-grant-item{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid ${T.border}33;}
  .gc-grant-item:last-child{border-bottom:none;}
  .gc-grant-left{flex:1;}
  .gc-grant-name{font-size:12px;font-weight:600;color:${T.textPri};}
  .gc-grant-org{font-family:${T.fontMono};font-size:9px;color:${T.textMute};margin-top:2px;}
  .gc-grant-amt{font-family:${T.fontDisplay};font-size:14px;font-weight:700;color:${T.green};white-space:nowrap;}
  .gc-progress-wrap{margin-top:10px;}
  .gc-progress-label{display:flex;justify-content:space-between;font-family:${T.fontMono};font-size:8px;color:${T.textMute};margin-bottom:5px;}
  .gc-progress-track{height:3px;background:${T.border};}
  .gc-progress-fill{height:100%;background:linear-gradient(90deg,${T.green},${T.teal});transition:width .9s;}
  .gc-progress-track.danger>.gc-progress-fill,.gc-progress-fill.danger{background:linear-gradient(90deg,${T.amber},${T.red});}

  /* ── TABLE ── */
  .gc-table{width:100%;border-collapse:collapse;}
  .gc-table thead tr{border-bottom:1px solid ${T.border};}
  .gc-table th{font-family:${T.fontMono};font-size:8px;letter-spacing:2px;color:${T.textMute};text-transform:uppercase;padding:0 0 8px;text-align:left;}
  [dir="rtl"] .gc-table th{text-align:right;}
  .gc-table td{padding:9px 0;font-size:11px;color:${T.textSec};border-bottom:1px solid ${T.border}44;vertical-align:middle;}
  .gc-table tr:last-child td{border-bottom:none;}
  .gc-table tr:hover td{color:${T.textPri};background:${T.greenDeep};}
  .gc-eco-badge{font-family:${T.fontMono};font-size:8px;padding:2px 6px;border:1px solid;display:inline-block;}
  .gc-eco-badge.A{border-color:${T.green}55;color:${T.green};}
  .gc-eco-badge.B{border-color:${T.amber}55;color:${T.amber};}
  .gc-eco-badge.C{border-color:${T.red}55;color:${T.red};}
  .gc-vendor-avatar{width:28px;height:28px;background:${T.panel};border:1px solid ${T.border};display:flex;align-items:center;justify-content:center;font-family:${T.fontMono};font-size:10px;color:${T.green};flex-shrink:0;}
  .gc-vendor-action{font-family:${T.fontMono};font-size:8px;letter-spacing:1px;color:${T.green};border:1px solid ${T.green}33;padding:3px 9px;cursor:pointer;background:transparent;text-transform:uppercase;transition:all .15s;}
  .gc-vendor-action:hover{background:${T.greenDeep};border-color:${T.green};}

  /* ── AI REPORTS MODULE ── */
  .gc-report-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;}
  .gc-template-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px;}
  .gc-template-card{border:1px solid ${T.border};padding:12px;cursor:pointer;transition:all .2s;background:${T.panel};}
  .gc-template-card:hover,.gc-template-card.sel{border-color:${T.green}55;background:${T.greenDeep};}
  .gc-template-card.sel{border-color:${T.green};}
  .gc-template-icon{font-size:20px;margin-bottom:6px;}
  .gc-template-name{font-size:11px;font-weight:600;color:${T.textPri};margin-bottom:3px;}
  .gc-template-desc{font-family:${T.fontMono};font-size:8px;color:${T.textMute};}
  .gc-ai-textarea{width:100%;background:${T.bg};border:1px solid ${T.border};color:${T.textPri};font-family:${T.fontMono};font-size:11px;padding:12px;outline:none;resize:vertical;min-height:90px;transition:border-color .2s;}
  .gc-ai-textarea:focus{border-color:${T.green}44;}
  .gc-ai-textarea::placeholder{color:${T.textMute};}
  .gc-ai-output{background:${T.bg};border:1px solid ${T.border};padding:14px;font-family:${T.fontMono};font-size:10px;color:${T.textSec};line-height:1.7;min-height:140px;position:relative;}
  .gc-ai-output.loading::after{content:'';display:inline-block;width:7px;height:12px;background:${T.green};animation:blink 1s step-end infinite;margin-left:4px;}
  .gc-generate-btn{width:100%;padding:11px;background:${T.green};color:#000;border:none;font-family:${T.fontMono};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all .2s;margin-top:12px;}
  .gc-generate-btn:hover{background:#00ffaa;box-shadow:0 0 24px rgba(0,255,136,.3);}
  .gc-generate-btn:disabled{background:${T.border};color:${T.textMute};cursor:not-allowed;}
  .gc-report-stat{background:${T.panel};border:1px solid ${T.border};padding:14px;text-align:center;}
  .gc-report-stat-val{font-family:${T.fontDisplay};font-size:22px;font-weight:700;color:${T.green};margin-bottom:4px;}
  .gc-report-stat-label{font-family:${T.fontMono};font-size:8px;color:${T.textMute};letter-spacing:2px;text-transform:uppercase;}

  /* ── CARBON CREDITS MODULE ── */
  .gc-credits-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px;}
  .gc-credit-ticker{background:${T.panel};border:1px solid ${T.border};padding:14px;}
  .gc-credit-type{font-family:${T.fontMono};font-size:8px;letter-spacing:2px;color:${T.textMute};text-transform:uppercase;margin-bottom:6px;}
  .gc-credit-price{font-family:${T.fontDisplay};font-size:22px;font-weight:700;color:${T.green};margin-bottom:4px;}
  .gc-credit-change{font-family:${T.fontMono};font-size:10px;}
  .gc-trade-btn{display:inline-flex;align-items:center;justify-content:center;padding:6px 14px;font-family:${T.fontMono};font-size:9px;letter-spacing:2px;cursor:pointer;border:1px solid;text-transform:uppercase;transition:all .15s;margin-top:10px;margin-right:6px;}
  .gc-trade-btn.buy{color:${T.green};border-color:${T.green}44;background:${T.greenDeep};}
  .gc-trade-btn.buy:hover{background:rgba(0,255,136,.2);}
  .gc-trade-btn.sell{color:${T.red};border-color:${T.red}44;background:rgba(255,51,85,.06);}
  .gc-trade-btn.sell:hover{background:rgba(255,51,85,.15);}
  .gc-portfolio-panel{background:${T.surface};border:1px solid ${T.green}33;padding:16px;position:relative;}
  .gc-portfolio-panel::before{content:'';position:absolute;inset:0;border:1px solid transparent;background:linear-gradient(${T.surface},${T.surface}) padding-box,linear-gradient(135deg,${T.green}44,transparent,${T.teal}33) border-box;}

  /* ── PRICING MODULE ── */
  .gc-pricing-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:16px;}
  .gc-plan{background:${T.panel};border:1px solid ${T.border};padding:20px;position:relative;transition:all .2s;}
  .gc-plan:hover{border-color:${T.borderHi};}
  .gc-plan.popular{border-color:${T.green}55;background:${T.greenDeep};}
  .gc-plan-popular-badge{position:absolute;top:-9px;left:50%;transform:translateX(-50%);background:${T.green};color:#000;font-family:${T.fontMono};font-size:8px;padding:2px 10px;letter-spacing:2px;white-space:nowrap;}
  .gc-plan-name{font-family:${T.fontDisplay};font-size:13px;font-weight:700;color:${T.textPri};margin-bottom:4px;}
  .gc-plan-price{font-family:${T.fontDisplay};font-size:28px;font-weight:900;color:${T.green};margin:12px 0 4px;}
  .gc-plan-period{font-family:${T.fontMono};font-size:9px;color:${T.textMute};}
  .gc-plan-divider{height:1px;background:${T.border};margin:14px 0;}
  .gc-plan-feature{font-family:${T.fontBody};font-size:11px;color:${T.textSec};padding:4px 0;display:flex;align-items:center;gap:8px;}
  .gc-plan-feature::before{content:'✓';color:${T.green};font-family:${T.fontMono};font-size:9px;flex-shrink:0;}
  .gc-plan-cta{width:100%;padding:10px;background:transparent;border:1px solid ${T.green}44;color:${T.green};font-family:${T.fontMono};font-size:10px;letter-spacing:2px;cursor:pointer;text-transform:uppercase;transition:all .2s;margin-top:16px;}
  .gc-plan-cta:hover{background:${T.greenDeep};border-color:${T.green};}
  .gc-plan.popular .gc-plan-cta{background:${T.green};color:#000;border-color:${T.green};}
  .gc-plan.popular .gc-plan-cta:hover{background:#00ffaa;}

  /* ── LOADING SCREEN ── */
  .gc-loading{display:flex;align-items:center;justify-content:center;height:100vh;background:${T.bg};flex-direction:column;gap:20px;}
  .gc-loading-hex{width:48px;height:48px;border:2px solid ${T.green};display:flex;align-items:center;justify-content:center;clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);animation:spin 3s linear infinite;}
  .gc-loading-text{font-family:${T.fontMono};font-size:10px;letter-spacing:3px;color:${T.textMute};text-transform:uppercase;}

  /* ── LOGIN ── */
  .gc-login{display:flex;height:100vh;overflow:hidden;}
  .gc-login-void{flex:1.5;background:radial-gradient(ellipse at 30% 50%,#082016 0%,${T.bg} 65%);position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;}
  .gc-bio-net{position:absolute;inset:0;opacity:.5;}
  .gc-login-tagline{position:relative;z-index:1;padding:48px;}
  .gc-login-eyebrow{font-family:${T.fontMono};font-size:9px;letter-spacing:4px;color:${T.teal};text-transform:uppercase;margin-bottom:16px;}
  .gc-login-big{font-family:${T.fontDisplay};font-size:52px;font-weight:900;line-height:1.05;letter-spacing:-1px;color:${T.textPri};text-transform:uppercase;}
  .gc-login-big span{color:${T.green};display:block;text-shadow:0 0 40px rgba(0,255,136,.3);}
  .gc-login-sub{font-family:${T.fontMono};font-size:11px;color:${T.textMute};margin-top:20px;letter-spacing:1px;line-height:1.7;max-width:380px;}
  .gc-hud-corner{position:absolute;width:50px;height:50px;border-color:${T.green}55;border-style:solid;}
  .gc-hud-tl{top:24px;left:24px;border-width:2px 0 0 2px;}
  .gc-hud-tr{top:24px;right:24px;border-width:2px 2px 0 0;}
  .gc-hud-bl{bottom:24px;left:24px;border-width:0 0 2px 2px;}
  .gc-hud-br{bottom:24px;right:24px;border-width:0 2px 2px 0;}
  .gc-health-module{position:absolute;bottom:28px;left:28px;border:1px solid ${T.border};background:rgba(10,21,16,.85);padding:11px 14px;backdrop-filter:blur(10px);}
  [dir="rtl"] .gc-health-module{left:auto;right:28px;}
  .gc-health-label{font-family:${T.fontMono};font-size:7px;letter-spacing:2px;color:${T.textMute};text-transform:uppercase;margin-bottom:7px;}
  .gc-health-nodes{display:flex;gap:7px;}
  .gc-health-node{width:7px;height:7px;border-radius:50%;background:${T.green};}
  .gc-health-node:nth-child(3){background:${T.amber};}
  .gc-login-col{width:380px;background:${T.surface};border-left:1px solid ${T.border};display:flex;flex-direction:column;padding:44px 36px;position:relative;overflow-y:auto;}
  [dir="rtl"] .gc-login-col{border-left:none;border-right:1px solid ${T.border};}
  .gc-login-logo{font-family:${T.fontDisplay};font-size:13px;font-weight:900;letter-spacing:4px;color:${T.green};text-transform:uppercase;}
  .gc-login-form-title{font-family:${T.fontDisplay};font-size:16px;font-weight:700;margin-top:24px;color:${T.textPri};letter-spacing:1px;text-transform:uppercase;}
  .gc-login-form-sub{font-family:${T.fontMono};font-size:9px;color:${T.textMute};margin-top:5px;letter-spacing:1px;}
  .gc-field{margin-bottom:16px;}
  .gc-field label{display:block;font-family:${T.fontMono};font-size:8px;letter-spacing:2px;color:${T.textMute};text-transform:uppercase;margin-bottom:6px;}
  .gc-field input{width:100%;background:${T.bg};border:1px solid ${T.border};color:${T.textPri};font-family:${T.fontMono};font-size:12px;padding:9px 12px;outline:none;transition:all .2s;border-radius:0;}
  .gc-field input:focus{border-color:${T.green}55;box-shadow:0 0 0 2px ${T.greenGlow};}
  .gc-field input::placeholder{color:${T.textMute};}
  .gc-token-display{background:${T.bg};border:1px solid ${T.border};padding:9px 12px;font-family:${T.fontMono};font-size:9px;color:${T.green};letter-spacing:1px;margin-bottom:16px;min-height:35px;display:flex;align-items:center;gap:6px;overflow:hidden;}
  .gc-token-cursor{display:inline-block;width:7px;height:11px;background:${T.green};animation:blink .9s step-end infinite;}
  .gc-btn{width:100%;padding:11px;background:${T.green};color:#000;border:none;font-family:${T.fontMono};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all .2s;}
  .gc-btn:hover{background:#00ffaa;box-shadow:0 0 28px rgba(0,255,136,.35);}
  .gc-btn:disabled{background:${T.border};color:${T.textMute};cursor:not-allowed;box-shadow:none;}
  .gc-btn-sec{background:transparent;color:${T.textSec};border:1px solid ${T.border};font-size:10px;padding:9px;letter-spacing:2px;}
  .gc-btn-sec:hover{border-color:${T.borderHi};color:${T.textPri};background:transparent;box-shadow:none;}
  .gc-btn-dev{background:transparent;color:${T.amber};border:1px dashed rgba(255,170,0,.4);font-size:9px;padding:8px;letter-spacing:2px;}
  .gc-btn-dev:hover{background:rgba(255,170,0,.08);box-shadow:none;}
  .gc-login-footer{margin-top:auto;padding-top:24px;font-family:${T.fontMono};font-size:8px;color:${T.textMute};letter-spacing:1px;line-height:1.8;}

  /* ── LANG SWITCHER ── */
  .lang-btn{display:flex;align-items:center;gap:6px;padding:4px 9px;border:1px solid ${T.border};background:${T.panel};cursor:pointer;font-family:${T.fontMono};font-size:9px;color:${T.textSec};user-select:none;transition:border-color .15s;}
  .lang-btn:hover,.lang-btn.open{border-color:${T.green}55;}
  .lang-dropdown{position:absolute;top:calc(100% + 4px);right:0;background:${T.surface};border:1px solid ${T.border};z-index:999;min-width:155px;box-shadow:0 8px 32px rgba(0,0,0,.6);}
  [dir="rtl"] .lang-dropdown{right:auto;left:0;}
  .lang-opt{display:flex;align-items:center;gap:10px;padding:8px 14px;cursor:pointer;font-family:${T.fontMono};font-size:10px;color:${T.textSec};border-left:2px solid transparent;transition:all .1s;}
  [dir="rtl"] .lang-opt{border-left:none;border-right:2px solid transparent;}
  .lang-opt:hover{background:${T.greenDeep};}
  .lang-opt.sel{color:${T.green};background:rgba(0,255,136,.05);border-left-color:${T.green};}
  [dir="rtl"] .lang-opt.sel{border-left-color:transparent;border-right-color:${T.green};}

  /* ── MISC ── */
  .gc-empty{display:flex;align-items:center;justify-content:center;height:240px;flex-direction:column;gap:12px;}
  .gc-empty-icon{font-size:32px;opacity:.4;}
  .gc-empty-msg{font-family:${T.fontMono};font-size:10px;letter-spacing:3px;color:${T.textMute};text-transform:uppercase;}
`;

// ── DATA ────────────────────────────────────────────────────────
const EMISSION_DATA=[{m:"J",v:68},{m:"F",v:74},{m:"M",v:59},{m:"A",v:81},{m:"M",v:63},{m:"J",v:55},{m:"J",v:70},{m:"A",v:48},{m:"S",v:52},{m:"O",v:44},{m:"N",v:39},{m:"D",v:36}];
const MAX_E=Math.max(...EMISSION_DATA.map(d=>d.v));
const ALERTS=[
  {type:"crit",icon:"⚡",msg:"Line 4 energy draw exceeded threshold by 34%",time:"2 MIN AGO"},
  {type:"warn",icon:"⚠",msg:"Carbon tax rate updated: EU CBAM +12% effective Q1 2027",time:"18 MIN AGO"},
  {type:"ok",icon:"✓",msg:"Scope 2 Q3 audit export certified & submitted",time:"1 HR AGO"},
  {type:"warn",icon:"⚠",msg:"Steel supplier ECO-57 rating downgraded to B",time:"3 HR AGO"},
  {type:"ok",icon:"✓",msg:"Green Capital Grant #GC-2024-081 pre-approved",time:"5 HR AGO"},
];
const SUPPLIERS=[
  {id:"SC",name:"SteelCore Nordic",loc:"Stockholm, SE",dist:"1,240 km",eco:"A",price:"$842/t"},
  {id:"GF",name:"GreenFab Materials",loc:"Rotterdam, NL",dist:"890 km",eco:"A",price:"$910/t"},
  {id:"BM",name:"BioMet Solutions",loc:"Lyon, FR",dist:"1,100 km",eco:"B",price:"$765/t"},
  {id:"AM",name:"ArcelorMittal",loc:"Luxembourg",dist:"980 km",eco:"B",price:"$720/t"},
  {id:"EI",name:"EcoIron AG",loc:"Frankfurt, DE",dist:"650 km",eco:"A",price:"$880/t"},
];
const COMMODITIES=[
  {name:"Low-Emission Steel",price:"$842.30",change:"+1.2%",up:true},
  {name:"Bio-Composite Polymer",price:"$1,204.00",change:"-0.8%",up:false},
  {name:"Recycled Aluminum",price:"$2,180.50",change:"+3.4%",up:true},
  {name:"Green Hydrogen (kg)",price:"$4.72",change:"-1.1%",up:false},
  {name:"Carbon Credit (EU ETS)",price:"$68.40",change:"+5.2%",up:true},
];
const GRANTS=[
  {name:"EU Green Industrial Fund",org:"European Commission",amt:"€2.4M",pct:78},
  {name:"IFC Climate Finance",org:"World Bank Group",amt:"$1.8M",pct:52},
  {name:"UK Net Zero Innovation",org:"Innovate UK",amt:"£900K",pct:91},
  {name:"DOE Industrial Decarbonization",org:"US Dept. of Energy",amt:"$3.1M",pct:35},
];
const TL_ITEMS=[
  {state:"done",label:"CBAM Phase 1 Filing",desc:"Submitted 14 Oct 2025 — Ref #EU-CBM-20251014"},
  {state:"done",label:"ISO 14064-1 Audit",desc:"Verified by Bureau Veritas, valid 24 months"},
  {state:"pend",label:"SEC Climate Disclosure",desc:"Deadline: 31 Mar 2027 — 68% complete"},
  {state:"alert",label:"Mexico ECOTASA Update",desc:"New tariff schedule unprocessed — action required"},
  {state:"pend",label:"UK Streamlined Energy",desc:"Annual SECR report due 31 Dec 2026"},
];
const REPORT_TEMPLATES=[
  {icon:"🌍",name:"ESG Report",desc:"GRI / SASB standard"},
  {icon:"📋",name:"CBAM Filing",desc:"EU Carbon Border Tax"},
  {icon:"🔍",name:"Scope 1-2-3",desc:"Emissions inventory"},
  {icon:"⚖️",name:"SEC Climate",desc:"TCFD disclosure"},
  {icon:"🌿",name:"Net Zero Plan",desc:"Science-based targets"},
  {icon:"🏭",name:"Supplier Audit",desc:"Due diligence report"},
];
const CARBON_MARKETS=[
  {type:"EU ETS",price:"$68.40",change:"+5.2%",vol:"12.4M t",up:true},
  {type:"Gold Standard",price:"$18.20",change:"+2.1%",vol:"3.8M t",up:true},
  {type:"VCS (Verra)",price:"$11.60",change:"-0.9%",vol:"8.2M t",up:false},
  {type:"CDM Credits",price:"$4.30",change:"+0.4%",vol:"1.1M t",up:true},
  {type:"California ARB",price:"$31.80",change:"-1.5%",vol:"5.6M t",up:false},
  {type:"RGGI (US NE)",price:"$14.90",change:"+3.8%",vol:"2.3M t",up:true},
];
const PLANS=[
  {key:"planStarter",price:"$490",features:["Up to 5 users","1 facility","Scope 1 & 2 tracking","PDF reports","Email support"],popular:false},
  {key:"planGrowth",price:"$1,490",features:["Up to 25 users","5 facilities","Full Scope 1-2-3","AI report generator","Supplier portal","Priority support"],popular:true},
  {key:"planEnterprise",price:"$4,900",features:["Unlimited users","Unlimited facilities","Carbon credits trading","Custom integrations","Dedicated CSM","SLA 99.9%"],popular:false},
  {key:"planCustom",price:"Custom",features:["White-label option","On-premise deploy","Custom AI models","Legal & compliance","24/7 support","Tailored SLA"],popular:false,noPrice:true},
];

// ── HELPERS ─────────────────────────────────────────────────────
function BioNet(){
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current; if(!c)return;
    const ctx=c.getContext("2d");
    const resize=()=>{c.width=c.offsetWidth;c.height=c.offsetHeight;};
    resize();
    const W=()=>c.width, H=()=>c.height;
    const nodes=Array.from({length:32},()=>({x:Math.random()*W(),y:Math.random()*H(),vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+1}));
    let raf;
    function draw(){
      ctx.clearRect(0,0,W(),H());
      nodes.forEach(n=>{
        n.x+=n.vx; n.y+=n.vy;
        if(n.x<0||n.x>W())n.vx*=-1;
        if(n.y<0||n.y>H())n.vy*=-1;
        ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,255,136,${n.r/4})`;ctx.fill();
      });
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<150){ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.strokeStyle=`rgba(0,255,136,${(1-d/150)*.35})`;ctx.lineWidth=.6;ctx.stroke();}
      }
      raf=requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={ref} className="gc-bio-net" style={{width:"100%",height:"100%"}}/>;
}

function Sparkline({up}){
  // eslint-disable-next-line react-hooks/purity
  const pts=useMemo(()=>Array.from({length:8},()=>Math.random()*16+4),[]);
  const W=56,H=22,xs=pts.map((_,i)=>(i/(pts.length-1))*W);
  const mn=Math.min(...pts),mx=Math.max(...pts);
  const ys=pts.map(v=>H-((v-mn)/(mx-mn+.01))*(H-4)-2);
  const d=xs.map((x,i)=>`${i===0?"M":"L"}${x},${ys[i]}`).join(" ");
  return <svg viewBox={`0 0 ${W} ${H}`} className="gc-sparkline"><path d={d} stroke={up?T.green:T.red} strokeWidth="1.5" fill="none"/></svg>;
}

function useTokenAnim(run){
  const [text,setText]=useState("");
  useEffect(()=>{
    if(!run){return;}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setText("");
    const str="GC-AUTH > HANDSHAKE-INIT... TOKEN: 8F3A-C91D-2E7B-5048";
    let i=0;
    const iv=setInterval(()=>{setText(str.slice(0,i));i++;if(i>str.length)clearInterval(iv);},30);
    return()=>clearInterval(iv);
  },[run]);
  return text;
}

function LangSwitcher({lang,setLang}){
  const [open,setOpen]=useState(false);
  const cur=LANGS.find(l=>l.code===lang);
  return(
    <div style={{position:"relative"}}>
      <div className={`lang-btn${open?" open":""}`} onClick={()=>setOpen(o=>!o)}>
        <span style={{fontSize:13}}>{cur.flag}</span>
        <span>{cur.label}</span>
        <span style={{color:T.textMute,fontSize:8}}>▾</span>
      </div>
      {open&&(
        <div className="lang-dropdown">
          {LANGS.map(l=>(
            <div key={l.code} className={`lang-opt${lang===l.code?" sel":""}`}
              onClick={()=>{setLang(l.code);setOpen(false);}}>
              <span style={{fontSize:14}}>{l.flag}</span>
              <span>{l.name}</span>
              {lang===l.code&&<span style={{marginLeft:"auto",color:T.green,fontSize:9}}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── LOGIN ──────────────────────────────────────────────────────
function LoginPage({onLogin,lang,setLang}){
  const {t,rtl}=useLang();
  const [user,setUser]=useState("");
  const [pass,setPass]=useState("");
  const [loading,setLoading]=useState(false);
  const token=useTokenAnim(loading);
  function handleLogin(){if(!user||!pass)return;setLoading(true);setTimeout(()=>onLogin(),2400);}
  return(
    <div className="gc-login" dir={rtl?"rtl":"ltr"}>
      <div className="gc-login-void">
        <BioNet/>
        <div className="gc-hud-corner gc-hud-tl"/>
        <div className="gc-hud-corner gc-hud-tr"/>
        <div className="gc-hud-corner gc-hud-bl"/>
        <div className="gc-hud-corner gc-hud-br"/>
        <div className="gc-login-tagline">
          <div className="gc-login-eyebrow">// INDUSTRIAL CLIMATE INTELLIGENCE PLATFORM</div>
          <div className="gc-login-big">
            {t.tagline}
            <span>{t.taglineGreen}</span>
          </div>
          <div className="gc-login-sub">
            AI-powered carbon management · Real-time supply chain monitoring ·
            Regulatory compliance automation · Carbon credits trading desk
          </div>
        </div>
        <div className="gc-health-module">
          <div className="gc-health-label">{t.networkHealth}</div>
          <div className="gc-health-nodes">
            {[0,1,2,3,4].map(i=><div key={i} className="gc-health-node" style={{animationDelay:`${i*.3}s`}}/>)}
          </div>
          <div style={{fontFamily:T.fontMono,fontSize:7,color:T.textMute,marginTop:7,letterSpacing:1}}>{t.allNominal}</div>
        </div>
      </div>
      <div className="gc-login-col">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <div className="gc-login-logo">{t.appName}</div>
          <LangSwitcher lang={lang} setLang={setLang}/>
        </div>
        <div className="gc-login-form-title">{t.systemAccess}</div>
        <div className="gc-login-form-sub">{t.gateway}</div>
        <div style={{height:1,background:T.border,margin:"20px 0"}}/>
        <div className="gc-field">
          <label>{t.enterpriseId}</label>
          <input value={user} onChange={e=>setUser(e.target.value)} placeholder="user@corporation.com" dir="ltr"/>
        </div>
        <div className="gc-field">
          <label>{t.passkey}</label>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••••••" dir="ltr"/>
        </div>
        <div className="gc-token-display">
          {loading?<>{token}<span className="gc-token-cursor"/></>:<span style={{color:T.textMute}}>{t.awaitHandshake}</span>}
        </div>
        <button className="gc-btn" onClick={handleLogin} disabled={!user||!pass||loading}>
          {loading?t.authenticating:t.initiateSession}
        </button>
        <div style={{marginTop:10}}>
          <button className="gc-btn gc-btn-sec" onClick={()=>{}}>{t.sso}</button>
        </div>
        <div style={{marginTop:10,borderTop:`1px dashed ${T.textMute}33`,paddingTop:10}}>
          <button className="gc-btn gc-btn-dev" onClick={()=>onLogin()}>{t.devBypass}</button>
          <div style={{fontFamily:T.fontMono,fontSize:8,color:T.textMute,textAlign:"center",marginTop:6,letterSpacing:1}}>{t.devMode}</div>
        </div>
        <div className="gc-login-footer">
          {t.security}<br/>
          <span style={{color:T.textMute,opacity:.5}}>{t.build}</span>
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD PAGE ─────────────────────────────────────────────
function DashboardPage(){
  const {t}=useLang();
  return(
    <>
      <div className="gc-page-header">
        <div className="gc-page-eyebrow">{t.mod1eyebrow}</div>
        <div className="gc-page-title">{t.mod1title}</div>
        <div className="gc-page-meta">{t.mod1meta}</div>
      </div>
      <div className="gc-kpi-row">
        {[
          {label:t.kpi1label,val:t.kpi1val,unit:t.kpi1unit,sub:t.kpi1sub,cls:"up",color:"green"},
          {label:t.kpi2label,val:t.kpi2val,unit:t.kpi2unit,sub:t.kpi2sub,cls:"down",color:"amber",card:"warn"},
          {label:t.kpi3label,val:t.kpi3val,unit:t.kpi3unit,sub:t.kpi3sub,cls:"up",color:"green"},
          {label:t.kpi4label,val:t.kpi4val,unit:t.kpi4unit,sub:t.kpi4sub,cls:"down",color:"red",card:"danger"},
        ].map((k,i)=>(
          <div key={i} className={`gc-kpi ${k.card||""}`} style={{animationDelay:`${i*.08}s`}}>
            <div className="gc-kpi-label">{k.label}</div>
            <div className={`gc-kpi-value ${k.color}`}>{k.val}</div>
            <div className="gc-kpi-unit">{k.unit}</div>
            <div className={`gc-kpi-sub ${k.cls}`}>{k.sub}</div>
          </div>
        ))}
      </div>
      <div className="gc-grid-3">
        <div className="gc-panel">
          <div className="gc-panel-header">
            <span className="gc-panel-title">{t.annualEmission}</span>
            <span className="gc-panel-badge live">LIVE</span>
          </div>
          <div className="gc-panel-body">
            <div className="gc-chart-bars">
              {EMISSION_DATA.map((d,i)=>(
                <div key={i} className="gc-bar-wrap">
                  <div className={`gc-bar ${i>9?"":"dim"}`} style={{height:`${(d.v/MAX_E)*84}px`}} data-val={`${d.v}k tCO₂e`}/>
                  <span className="gc-bar-label">{d.m}</span>
                </div>
              ))}
            </div>
            <div className="gc-scope-list">
              {[
                {name:t.scope1,val:"12,480 t",pct:35,col:T.green},
                {name:t.scope2,val:"9,120 t",pct:26,col:T.amber},
                {name:t.scope3,val:"13,890 t",pct:39,col:T.blue},
              ].map((s,i)=>(
                <div key={i}>
                  <div className="gc-scope-header">
                    <span className="gc-scope-name">{s.name}</span>
                    <span className="gc-scope-val">{s.val}</span>
                  </div>
                  <div className="gc-scope-track">
                    <div className="gc-scope-fill" style={{width:`${s.pct}%`,background:s.col,color:s.col}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="gc-panel">
          <div className="gc-panel-header">
            <span className="gc-panel-title">{t.systemAlerts}</span>
            <span className="gc-panel-badge" style={{color:T.red,borderColor:T.red+"44",background:"rgba(255,51,85,.06)"}}>{t.criticalAlerts}</span>
          </div>
          <div className="gc-panel-body" style={{padding:"8px 16px"}}>
            <div className="gc-alert-feed">
              {ALERTS.map((a,i)=>(
                <div key={i} className="gc-alert-item">
                  <div className={`gc-alert-icon ${a.type}`}>{a.icon}</div>
                  <div>
                    <div className="gc-alert-msg">{a.msg}</div>
                    <div className="gc-alert-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="gc-panel">
        <div className="gc-panel-header">
          <span className="gc-panel-title">{t.complianceStatus}</span>
          <span className="gc-panel-badge">{t.activeItems}</span>
        </div>
        <div className="gc-panel-body">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 36px"}}>
            <div className="gc-timeline">
              {TL_ITEMS.slice(0,3).map((item,i)=>(
                <div key={i} className="gc-tl-item">
                  <div className={`gc-tl-dot ${item.state}`}/>
                  <div className="gc-tl-label">{item.label}</div>
                  <div className="gc-tl-desc">{item.desc}</div>
                </div>
              ))}
            </div>
            <div className="gc-timeline">
              {TL_ITEMS.slice(3).map((item,i)=>(
                <div key={i} className="gc-tl-item">
                  <div className={`gc-tl-dot ${item.state}`}/>
                  <div className="gc-tl-label">{item.label}</div>
                  <div className="gc-tl-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── OPTIMIZER PAGE ─────────────────────────────────────────────
function OptimizerPage(){
  const {t}=useLang();
  return(
    <>
      <div className="gc-page-header">
        <div className="gc-page-eyebrow">{t.mod3eyebrow}</div>
        <div className="gc-page-title">{t.mod3title}</div>
        <div className="gc-page-meta">{t.mod3meta}</div>
      </div>
      <div className="gc-optimizer-grid">
        {[
          {icon:"⚡",label:"Energy Anomalies",val:"3",sub:"Line 4 · Furnace B · Compressor 7",color:T.red},
          {icon:"💧",label:"Waste Spikes",val:"1",sub:"Coolant leak — Est. $4,200/day",color:T.amber},
          {icon:"💰",label:"Capital Recovered",val:"$1.4M",sub:"This quarter",color:T.green},
          {icon:"🌿",label:"Price Parity Items",val:"7",sub:"Low-emission materials at par",color:T.green},
          {icon:"📋",label:"Grant Applications",val:"4",sub:"Active — $8.2M in pipeline",color:T.teal},
          {icon:"🔔",label:"Penalty Forecasts",val:"3",sub:"High confidence — next 90 days",color:T.red},
        ].map((c,i)=>(
          <div key={i} className="gc-opt-card">
            <div className="gc-opt-icon">{c.icon}</div>
            <div className="gc-opt-label">{c.label}</div>
            <div className="gc-opt-val" style={{color:c.color}}>{c.val}</div>
            <div className="gc-opt-sub">{c.sub}</div>
          </div>
        ))}
      </div>
      <div className="gc-grid-2">
        <div className="gc-panel">
          <div className="gc-panel-header">
            <span className="gc-panel-title">{t.commodityIndex}</span>
            <span className="gc-panel-badge live">LIVE</span>
          </div>
          <div className="gc-panel-body" style={{padding:"8px 16px"}}>
            {COMMODITIES.map((c,i)=>(
              <div key={i} className="gc-mkt-row">
                <div className="gc-mkt-name">{c.name}</div>
                <Sparkline up={c.up}/>
                <div className="gc-mkt-price">{c.price}</div>
                <div className={`gc-mkt-change ${c.up?"gc-green":"gc-red"}`}>{c.change}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="gc-panel">
          <div className="gc-panel-header">
            <span className="gc-panel-title">{t.greenCapital}</span>
            <span className="gc-panel-badge" style={{color:T.teal,borderColor:T.teal+"44",background:"rgba(0,212,170,.08)"}}>{t.pipeline}</span>
          </div>
          <div className="gc-panel-body" style={{padding:"8px 16px"}}>
            {GRANTS.map((g,i)=>(
              <div key={i} className="gc-grant-item">
                <div className="gc-grant-left">
                  <div className="gc-grant-name">{g.name}</div>
                  <div className="gc-grant-org">{g.org}</div>
                  <div className="gc-progress-wrap">
                    <div className="gc-progress-label">
                      <span>{t.application}</span><span>{g.pct}%</span>
                    </div>
                    <div className="gc-progress-track">
                      <div className="gc-progress-fill" style={{width:`${g.pct}%`}}/>
                    </div>
                  </div>
                </div>
                <div className="gc-grant-amt">{g.amt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── SOURCING PAGE ──────────────────────────────────────────────
function SourcingPage(){
  const {t}=useLang();
  return(
    <>
      <div className="gc-page-header">
        <div className="gc-page-eyebrow">{t.mod4eyebrow}</div>
        <div className="gc-page-title">{t.mod4title}</div>
        <div className="gc-page-meta">{t.mod4meta}</div>
      </div>
      <div className="gc-kpi-row" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
        {[
          {label:t.avgDelivery,val:"972 km",sub:"▼ 14% vs conventional",color:"green"},
          {label:t.avgCarbon,val:"A–",sub:"Top 18% of global network",color:"green"},
          {label:t.activeRfq,val:"12",sub:"Est. $4.2M contract value",color:""},
        ].map((k,i)=>(
          <div key={i} className="gc-kpi">
            <div className="gc-kpi-label">{k.label}</div>
            <div className={`gc-kpi-value ${k.color}`}>{k.val}</div>
            <div className="gc-kpi-sub" style={{marginTop:6}}>{k.sub}</div>
          </div>
        ))}
      </div>
      <div className="gc-panel" style={{marginBottom:12}}>
        <div className="gc-panel-header">
          <span className="gc-panel-title">{t.supplierMarket}</span>
          <span className="gc-panel-badge" style={{color:T.green,borderColor:T.green+"44",background:T.greenDeep}}>{t.ecoVerified}</span>
        </div>
        <div className="gc-panel-body">
          <table className="gc-table">
            <thead>
              <tr>
                <th>{t.supplier}</th><th>{t.location}</th><th>{t.distance}</th>
                <th>{t.ecoRating}</th><th>{t.unitPrice}</th><th></th>
              </tr>
            </thead>
            <tbody>
              {SUPPLIERS.map((s,i)=>(
                <tr key={i}>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:9}}>
                      <div className="gc-vendor-avatar">{s.id}</div>
                      <span style={{color:T.textPri,fontWeight:500}}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{fontFamily:T.fontMono,fontSize:10}}>{s.loc}</td>
                  <td style={{fontFamily:T.fontMono,fontSize:10}}>{s.dist}</td>
                  <td><span className={`gc-eco-badge ${s.eco}`}>{s.eco}</span></td>
                  <td style={{fontFamily:T.fontMono,color:T.textPri}}>{s.price}</td>
                  <td><button className="gc-vendor-action">{t.requestQuote}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="gc-panel">
        <div className="gc-panel-header">
          <span className="gc-panel-title">{t.penaltyPredictor}</span>
          <span className="gc-panel-badge" style={{color:T.red,borderColor:T.red+"44",background:"rgba(255,51,85,.06)"}}>{t.highRisk}</span>
        </div>
        <div className="gc-panel-body">
          {[
            {region:"Mexico — ECOTASA",risk:92,est:"$180,000",deadline:"15 Jul 2026"},
            {region:"UK — SECR Non-filing",risk:74,est:"$65,000",deadline:"31 Dec 2026"},
            {region:"Brazil — REDD+ Offset",risk:61,est:"$290,000",deadline:"01 Mar 2027"},
          ].map((r,i)=>(
            <div key={i} style={{marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:12,fontWeight:600,color:T.textPri,fontFamily:T.fontBody}}>{r.region}</span>
                <span style={{fontFamily:T.fontMono,fontSize:9,color:T.red}}>Est. {r.est} · Due {r.deadline}</span>
              </div>
              <div className="gc-progress-track">
                <div style={{height:"100%",width:`${r.risk}%`,background:r.risk>80?T.red:r.risk>60?T.amber:T.green,transition:"width .9s"}}/>
              </div>
              <div style={{fontFamily:T.fontMono,fontSize:8,color:T.textMute,marginTop:3}}>{t.penaltyProb}: {r.risk}%</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── AI REPORTS PAGE ────────────────────────────────────────────
function AIReportsPage(){
  const {t}=useLang();
  const [selected,setSelected]=useState(null);
  const [prompt,setPrompt]=useState("");
  const [status,setStatus]=useState("idle"); // idle | loading | done
  const [output,setOutput]=useState("");

  async function handleGenerate(){
    if(!selected)return;
    setStatus("loading");
    setOutput("");
    const templateName=REPORT_TEMPLATES[selected]?.name||"ESG Report";
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:1000,
          messages:[{
            role:"user",
            content:`You are GreenChain AI, an enterprise carbon management platform. Generate a professional executive summary for a ${templateName} for an industrial company.${prompt?` Additional context: ${prompt}`:""}
            
Format as a concise 3-paragraph executive report with:
- Key findings and metrics
- Regulatory compliance status  
- Recommended action items

Use professional corporate language. Include specific numbers where relevant. Keep it to 250-300 words.`
          }]
        })
      });
      const data=await res.json();
      const text=data.content?.map(c=>c.text||"").join("")||"Report generation failed.";
      setOutput(text);
      setStatus("done");
    }catch{
      setOutput("Error connecting to AI engine. Please check your network connection.");
      setStatus("done");
    }
  }

  return(
    <>
      <div className="gc-page-header">
        <div className="gc-page-eyebrow">{t.aiReportsEyebrow}</div>
        <div className="gc-page-title">{t.aiReportsTitle}</div>
        <div className="gc-page-meta">{t.aiReportsMeta}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
        {[
          {val:"40+",label:"Report Templates"},
          {val:"12s",label:"Avg. Generation Time"},
          {val:"GRI/SASB",label:"Standards Supported"},
          {val:"SOC 2",label:"Data Security"},
        ].map((s,i)=>(
          <div key={i} className="gc-report-stat">
            <div className="gc-report-stat-val">{s.val}</div>
            <div className="gc-report-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="gc-panel" style={{marginBottom:12}}>
        <div className="gc-panel-header">
          <span className="gc-panel-title">{t.reportType}</span>
          <span className="gc-panel-badge" style={{color:T.teal,borderColor:T.teal+"44",background:"rgba(0,212,170,.08)"}}>CLAUDE AI</span>
        </div>
        <div className="gc-panel-body">
          <div className="gc-template-grid">
            {REPORT_TEMPLATES.map((r,i)=>(
              <div key={i} className={`gc-template-card${selected===i?" sel":""}`} onClick={()=>setSelected(i)}>
                <div className="gc-template-icon">{r.icon}</div>
                <div className="gc-template-name">{r.name}</div>
                <div className="gc-template-desc">{r.desc}</div>
              </div>
            ))}
          </div>
          <textarea
            className="gc-ai-textarea"
            placeholder={t.reportPromptPh}
            value={prompt}
            onChange={e=>setPrompt(e.target.value)}
          />
          <button
            className="gc-generate-btn"
            disabled={selected===null||status==="loading"}
            onClick={handleGenerate}
          >
            {status==="loading"?t.reportStatus:t.generateReport}
          </button>
        </div>
      </div>
      {(status==="loading"||status==="done")&&(
        <div className="gc-panel">
          <div className="gc-panel-header">
            <span className="gc-panel-title">{t.aiAnalysis}</span>
            {status==="done"&&(
              <button className="gc-vendor-action" style={{marginLeft:"auto"}}>
                {t.reportDownload} ↓
              </button>
            )}
          </div>
          <div className="gc-panel-body">
            <div className={`gc-ai-output${status==="loading"?" loading":""}`}>
              {status==="loading"?(
                <span style={{color:T.textMute}}>{t.reportStatus}</span>
              ):(
                <span style={{whiteSpace:"pre-wrap",lineHeight:1.8}}>{output}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── SETTINGS PAGE ─────────────────────────────────────────────
const SettingsFormField=({label,field,placeholder,type="text",form,setForm})=>(
  <div className="gc-field">
    <label>{label}</label>
    <input type={type} value={form[field]} placeholder={placeholder}
      onChange={e=>setForm(f=>({...f,[field]:e.target.value}))}/>
  </div>
);

const SettingsToggle=({label,desc,field,form,setForm})=>(
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
    padding:"12px 0",borderBottom:`1px solid ${T.border}44`}}>
    <div>
      <div style={{fontSize:12,fontWeight:600,color:T.textPri}}>{label}</div>
      <div style={{fontFamily:T.fontMono,fontSize:9,color:T.textMute,marginTop:3}}>{desc}</div>
    </div>
    <div onClick={()=>setForm(f=>({...f,[field]:!f[field]}))}
      style={{width:40,height:22,borderRadius:11,cursor:"pointer",transition:"all .2s",
        background:form[field]?T.green:T.border,position:"relative",flexShrink:0}}>
      <div style={{position:"absolute",top:3,left:form[field]?20:3,
        width:16,height:16,borderRadius:"50%",
        background:form[field]?"#000":T.textMute,transition:"left .2s"}}/>
    </div>
  </div>
);

function SettingsPage(){
  const [saving,setSaving]=useState(false);
  const [saved,setSaved]=useState(false);
  const [form,setForm]=useState({
    companyName:"",industry:"",country:"",email:"",phone:"",
    scopeTarget:"",offsetBudget:"",
    emailAlerts:true,penaltyAlerts:true,reportReady:true,
  });
  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      if(data?.user?.email) setForm(f=>({...f,email:data.user.email}));
    });
  },[]);
  async function handleSave(){
    setSaving(true);
    const {data:{user}}=await supabase.auth.getUser();
    await supabase.from("settings").upsert({
      user_id:user.id,company_name:form.companyName,industry:form.industry,
      country:form.country,phone:form.phone,scope_target:form.scopeTarget,
      offset_budget:form.offsetBudget,email_alerts:form.emailAlerts,
      penalty_alerts:form.penaltyAlerts,report_ready:form.reportReady,
    });
    setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),3000);
  }
  return(
    <>
      <div className="gc-page-header">
        <div className="gc-page-eyebrow">MODULE VII · SYSTEM</div>
        <div className="gc-page-title">Enterprise Configuration</div>
        <div className="gc-page-meta">Account settings · Notifications · Sustainability targets</div>
      </div>
      <div className="gc-grid-2" style={{marginBottom:12}}>
        <div className="gc-panel">
          <div className="gc-panel-header">
            <span className="gc-panel-title">COMPANY PROFILE</span>
            <span className="gc-panel-badge">ENTERPRISE</span>
          </div>
          <div className="gc-panel-body">
            <SettingsFormField label="Company Name" field="companyName" placeholder="Acme Industrial Corp" form={form} setForm={setForm}/>
            <SettingsFormField label="Industry" field="industry" placeholder="Steel Manufacturing" form={form} setForm={setForm}/>
            <SettingsFormField label="Country / Region" field="country" placeholder="Germany — EU" form={form} setForm={setForm}/>
            <SettingsFormField label="Contact Email" field="email" placeholder="ops@company.com" type="email" form={form} setForm={setForm}/>
            <SettingsFormField label="Phone" field="phone" placeholder="+49 30 123456" form={form} setForm={setForm}/>
          </div>
        </div>
        <div className="gc-panel">
          <div className="gc-panel-header">
            <span className="gc-panel-title">SUSTAINABILITY TARGETS</span>
            <span className="gc-panel-badge live">ACTIVE</span>
          </div>
          <div className="gc-panel-body">
            <SettingsFormField label="Scope 1+2 Reduction Target (%)" field="scopeTarget" placeholder="e.g. 40" form={form} setForm={setForm}/>
            <SettingsFormField label="Annual Carbon Offset Budget ($)" field="offsetBudget" placeholder="e.g. 500000" form={form} setForm={setForm}/>
            <div style={{marginTop:16,padding:14,background:T.panel,border:`1px solid ${T.border}`}}>
              <div style={{fontFamily:T.fontMono,fontSize:8,color:T.textMute,letterSpacing:2,marginBottom:10}}>TARGET PROGRESS</div>
              {[
                {label:"Scope 1 Reduction",pct:62,col:T.green},
                {label:"Scope 2 Reduction",pct:41,col:T.amber},
                {label:"Offset Goal",pct:82,col:T.teal},
              ].map((p,i)=>(
                <div key={i} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontFamily:T.fontMono,fontSize:9,color:T.textMute,marginBottom:4}}>
                    <span>{p.label}</span><span>{p.pct}%</span>
                  </div>
                  <div className="gc-progress-track">
                    <div className="gc-progress-fill" style={{width:`${p.pct}%`,background:p.col}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="gc-panel" style={{marginBottom:12}}>
        <div className="gc-panel-header">
          <span className="gc-panel-title">NOTIFICATION PREFERENCES</span>
          <span className="gc-panel-badge">3 ACTIVE</span>
        </div>
        <div className="gc-panel-body">
          <SettingsToggle label="Email Alerts" desc="Receive system alerts via email" field="emailAlerts" form={form} setForm={setForm}/>
          <SettingsToggle label="Penalty Risk Warnings" desc="Alert when penalty probability exceeds 60%" field="penaltyAlerts" form={form} setForm={setForm}/>
          <SettingsToggle label="Report Ready Notifications" desc="Notify when AI reports are generated" field="reportReady" form={form} setForm={setForm}/>
        </div>
      </div>
      <button className="gc-generate-btn" onClick={handleSave} disabled={saving} style={{maxWidth:400}}>
        {saving?"SAVING...":(saved?"✓ SAVED SUCCESSFULLY":"SAVE CONFIGURATION")}
      </button>
    </>
  );
}

// ── CARBON CREDITS PAGE ────────────────────────────────────────
function CarbonCreditsPage(){
  const {t}=useLang();
  return(
    <>
      <div className="gc-page-header">
        <div className="gc-page-eyebrow">{t.creditsEyebrow}</div>
        <div className="gc-page-title">{t.creditsTitle}</div>
        <div className="gc-page-meta">{t.creditsMeta}</div>
      </div>
      <div className="gc-portfolio-panel" style={{marginBottom:14}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
          {[
            {label:t.totalCredits,val:"4,820 t",color:T.green},
            {label:t.portfolioVal,val:"$329,000",color:T.green},
            {label:t.offsetGoal,val:"82%",color:T.teal},
            {label:"Verified Registries",val:"3 Active",color:T.textPri},
          ].map((s,i)=>(
            <div key={i}>
              <div style={{fontFamily:T.fontMono,fontSize:8,color:T.textMute,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>{s.label}</div>
              <div style={{fontFamily:T.fontDisplay,fontSize:22,fontWeight:700,color:s.color}}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="gc-grid-2">
        <div className="gc-panel">
          <div className="gc-panel-header">
            <span className="gc-panel-title">Live Market Prices</span>
            <span className="gc-panel-badge live">LIVE</span>
          </div>
          <div className="gc-panel-body" style={{padding:"8px 16px"}}>
            {CARBON_MARKETS.map((m,i)=>(
              <div key={i} className="gc-mkt-row">
                <div className="gc-mkt-name">{m.type}</div>
                <Sparkline up={m.up}/>
                <div style={{fontFamily:T.fontMono,fontSize:9,color:T.textMute,width:60,textAlign:"right"}}>{m.vol}</div>
                <div className="gc-mkt-price">{m.price}</div>
                <div className={`gc-mkt-change ${m.up?"gc-green":"gc-red"}`}>{m.change}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="gc-panel">
          <div className="gc-panel-header">
            <span className="gc-panel-title">Trade Desk</span>
            <span className="gc-panel-badge" style={{color:T.teal,borderColor:T.teal+"44"}}>EU ETS ACTIVE</span>
          </div>
          <div className="gc-panel-body">
            {[
              {type:"EU ETS",price:"$68.40",avail:"12,400 t"},
              {type:"Gold Standard",price:"$18.20",avail:"3,200 t"},
              {type:"VCS (Verra)",price:"$11.60",avail:"28,500 t"},
            ].map((c,i)=>(
              <div key={i} style={{padding:"12px 0",borderBottom:i<2?`1px solid ${T.border}44`:"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontFamily:T.fontBody,fontSize:13,fontWeight:600,color:T.textPri}}>{c.type}</span>
                  <span style={{fontFamily:T.fontDisplay,fontSize:16,fontWeight:700,color:T.green}}>{c.price}<span style={{fontFamily:T.fontMono,fontSize:8,color:T.textMute}}> /t</span></span>
                </div>
                <div style={{fontFamily:T.fontMono,fontSize:9,color:T.textMute,marginBottom:10}}>Available: {c.avail}</div>
                <div>
                  <button className="gc-trade-btn buy">{t.buyCredits}</button>
                  <button className="gc-trade-btn sell">{t.sellCredits}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="gc-panel">
        <div className="gc-panel-header">
          <span className="gc-panel-title">{t.pricingTitle}</span>
          <span className="gc-panel-badge" style={{color:T.teal,borderColor:T.teal+"44"}}>{t.pricingSubtitle}</span>
        </div>
        <div className="gc-panel-body">
          <div className="gc-pricing-grid">
            {PLANS.map((plan,i)=>{
              return(
                <div key={i} className={`gc-plan${plan.popular?" popular":""}`}>
                  {plan.popular&&<div className="gc-plan-popular-badge">{t.mostPopular}</div>}
                  <div className="gc-plan-name">{t[plan.key]}</div>
                  <div className="gc-plan-price">{plan.price}</div>
                  {!plan.noPrice&&<div className="gc-plan-period">{t.perMonth}</div>}
                  <div className="gc-plan-divider"/>
                  {plan.features.map((f,j)=>(
                    <div key={j} className="gc-plan-feature">{f}</div>
                  ))}
                  <button className="gc-plan-cta">
                    {plan.noPrice?t.contactSales:t.getStarted}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// ── SHELL ──────────────────────────────────────────────────────
function Shell({onLogout}){
  const [page,setPage]=useState("dashboard");
  const [lang,setLang]=useState("en");
  const t=TR[lang]||TR.en;
  const rtl=LANGS.find(l=>l.code===lang)?.rtl||false;

  const NAV=[
    {section:t.coreModules,items:[
      {id:"dashboard",icon:"◈",label:t.navDashboard},
      {id:"compliance",icon:"⚖",label:t.navCompliance,badge:"3"},
      {id:"optimizer",icon:"◎",label:t.navOptimizer},
      {id:"sourcing",icon:"◉",label:t.navSourcing},
    ]},
    {section:t.intelligence,items:[
      {id:"reports",icon:"✦",label:t.navReports,isNew:true},
      {id:"credits",icon:"◇",label:t.navCredits,isNew:true},
    ]},
    {section:t.system,items:[
      {id:"settings",icon:"⊕",label:t.navSettings},
      {id:"exports",icon:"⊞",label:t.navExports},
    ]},
  ];

  function renderPage(){
    if(page==="dashboard")return <DashboardPage/>;
    if(page==="optimizer")return <OptimizerPage/>;
    if(page==="sourcing")return <SourcingPage/>;
    if(page==="reports")return <AIReportsPage/>;
    if(page==="credits")return <CarbonCreditsPage/>;
    if(page==="settings")return <SettingsPage/>;
    return(
      <div className="gc-empty">
        <div className="gc-empty-icon">⊕</div>
        <div className="gc-empty-msg">{t.moduleUnderConstruction}</div>
        <div style={{fontFamily:T.fontMono,fontSize:9,color:T.textMute}}>{t.navigateTo}</div>
      </div>
    );
  }

  return(
    <LangCtx.Provider value={{lang,t,rtl}}>
      <div className="gc-root" dir={rtl?"rtl":"ltr"}>
        <div className="gc-scanline"/>
        <div className="gc-sidebar">
          <div className="gc-sidebar-glow"/>
          <div className="gc-logo">
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div className="gc-logo-hex"><div className="gc-logo-hex-inner">GC</div></div>
              <div>
                <div className="gc-logo-name">{t.appName}</div>
                <div className="gc-logo-ver">AI SYS v4.12.3</div>
              </div>
            </div>
          </div>
          <nav className="gc-nav">
            {NAV.map(group=>(
              <div key={group.section}>
                <div className="gc-nav-section">{group.section}</div>
                {group.items.map(item=>(
                  <div
                    key={item.id}
                    className={`gc-nav-item${page===item.id?" active":""}`}
                    onClick={()=>setPage(item.id)}
                  >
                    <span className="gc-nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge&&<span className="gc-nav-badge">{item.badge}</span>}
                    {item.isNew&&<span className="gc-nav-new">NEW</span>}
                  </div>
                ))}
              </div>
            ))}
          </nav>
          <div className="gc-sidebar-footer">
            <div className="gc-status-row">
              <div className="gc-status-dot-wrap">
                <div className="gc-status-ping"/>
                <div className="gc-status-dot"/>
              </div>
              <span>{t.allNominal}</span>
            </div>
            <div className="gc-logout" onClick={onLogout}>{t.terminateSession}</div>
          </div>
        </div>
        <div className="gc-main">
          <div className="gc-topbar">
            <div className="gc-topbar-left">
              <span>{t.appName}</span>
              <span style={{color:T.textMute,fontSize:9}}>›</span>
              <span className="gc-topbar-crumb">{t.enterpriseDashboard}</span>
              <span className="gc-auth-pill">{t.authenticated}</span>
            </div>
            <div className="gc-topbar-right">
              <LangSwitcher lang={lang} setLang={setLang}/>
              <div className="gc-icon-btn" title="Notifications">
                🔔
                <div className="gc-alert-pip"/>
              </div>
              <div className="gc-icon-btn" title="Settings">⚙</div>
              <div className="gc-avatar">{LANGS.find(l=>l.code===lang)?.label}</div>
            </div>
          </div>
          <div className="gc-content">
            {renderPage()}
          </div>
        </div>
      </div>
    </LangCtx.Provider>
  );
}

// ── ROOT ───────────────────────────────────────────────────────
export default function GreenChainApp(){
  const [screen,setScreen]=useState("login");
  const [lang,setLang]=useState("en");
  const t=TR[lang]||TR.en;
  const rtl=LANGS.find(l=>l.code===lang)?.rtl||false;

  function handleLogin(){
    setScreen("loading");
    setTimeout(()=>setScreen("app"),1600);
  }

  return(
    <>
      <style>{css}</style>
      {screen==="login"&&(
        <LangCtx.Provider value={{lang,t,rtl}}>
          <LoginPage onLogin={handleLogin} lang={lang} setLang={setLang}/>
        </LangCtx.Provider>
      )}
      {screen==="loading"&&(
        <div className="gc-loading">
          <div className="gc-loading-hex">
            <span style={{fontFamily:T.fontDisplay,fontSize:14,fontWeight:900,color:T.green}}>GC</span>
          </div>
          <div className="gc-loading-text">{t.initTelemetry}</div>
        </div>
      )}
      {screen==="app"&&(
        <Shell onLogout={()=>setScreen("login")}/>
      )}
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { CARBON_MARKETS, PLANS, Sparkline, T, useLang };