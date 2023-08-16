"use strict";(self.webpackChunkrealtor_exp_frontend=self.webpackChunkrealtor_exp_frontend||[]).push([[407],{5407:(_t,k,c)=>{c.r(k),c.d(k,{FaqsModule:()=>ut});var h=c(6814),I=c(1896),i=c(5879),w=c(8337),u=c(2495),f=c(8645),B=c(7394);let F=0;const x=new i.OlP("CdkAccordion");let H=(()=>{class n{constructor(){this._stateChanges=new f.x,this._openCloseAllActions=new f.x,this.id="cdk-accordion-"+F++,this._multi=!1}get multi(){return this._multi}set multi(t){this._multi=(0,u.Ig)(t)}openAll(){this._multi&&this._openCloseAllActions.next(!0)}closeAll(){this._openCloseAllActions.next(!1)}ngOnChanges(t){this._stateChanges.next(t)}ngOnDestroy(){this._stateChanges.complete(),this._openCloseAllActions.complete()}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275dir=i.lG2({type:n,selectors:[["cdk-accordion"],["","cdkAccordion",""]],inputs:{multi:"multi"},exportAs:["cdkAccordion"],features:[i._Bn([{provide:x,useExisting:n}]),i.TTD]}),n})(),N=0,j=(()=>{class n{get expanded(){return this._expanded}set expanded(t){t=(0,u.Ig)(t),this._expanded!==t&&(this._expanded=t,this.expandedChange.emit(t),t?(this.opened.emit(),this._expansionDispatcher.notify(this.id,this.accordion?this.accordion.id:this.id)):this.closed.emit(),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled}set disabled(t){this._disabled=(0,u.Ig)(t)}constructor(t,e,o){this.accordion=t,this._changeDetectorRef=e,this._expansionDispatcher=o,this._openCloseAllSubscription=B.w0.EMPTY,this.closed=new i.vpe,this.opened=new i.vpe,this.destroyed=new i.vpe,this.expandedChange=new i.vpe,this.id="cdk-accordion-child-"+N++,this._expanded=!1,this._disabled=!1,this._removeUniqueSelectionListener=()=>{},this._removeUniqueSelectionListener=o.listen((r,d)=>{this.accordion&&!this.accordion.multi&&this.accordion.id===d&&this.id!==r&&(this.expanded=!1)}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions())}ngOnDestroy(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe()}toggle(){this.disabled||(this.expanded=!this.expanded)}close(){this.disabled||(this.expanded=!1)}open(){this.disabled||(this.expanded=!0)}_subscribeToOpenCloseAllActions(){return this.accordion._openCloseAllActions.subscribe(t=>{this.disabled||(this.expanded=t)})}}return n.\u0275fac=function(t){return new(t||n)(i.Y36(x,12),i.Y36(i.sBO),i.Y36(w.A8))},n.\u0275dir=i.lG2({type:n,selectors:[["cdk-accordion-item"],["","cdkAccordionItem",""]],inputs:{expanded:"expanded",disabled:"disabled"},outputs:{closed:"closed",opened:"opened",destroyed:"destroyed",expandedChange:"expandedChange"},exportAs:["cdkAccordionItem"],features:[i._Bn([{provide:x,useValue:void 0}])]}),n})(),W=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({}),n})();var g=c(8484),_=c(3680),T=c(4300),Q=c(3997),P=c(7921),v=c(2181),z=c(8180),y=c(6028),G=c(6232),$=c(3019),s=c(6825);const V=["body"];function U(n,a){}const Y=[[["mat-expansion-panel-header"]],"*",[["mat-action-row"]]],Z=["mat-expansion-panel-header","*","mat-action-row"];function q(n,a){if(1&n&&i._UZ(0,"span",2),2&n){const t=i.oxw();i.Q6J("@indicatorRotate",t._getExpandedState())}}const K=[[["mat-panel-title"]],[["mat-panel-description"]],"*"],X=["mat-panel-title","mat-panel-description","*"],M=new i.OlP("MAT_ACCORDION"),D="225ms cubic-bezier(0.4,0.0,0.2,1)",E={indicatorRotate:(0,s.X$)("indicatorRotate",[(0,s.SB)("collapsed, void",(0,s.oB)({transform:"rotate(0deg)"})),(0,s.SB)("expanded",(0,s.oB)({transform:"rotate(180deg)"})),(0,s.eR)("expanded <=> collapsed, void => collapsed",(0,s.jt)(D))]),bodyExpansion:(0,s.X$)("bodyExpansion",[(0,s.SB)("collapsed, void",(0,s.oB)({height:"0px",visibility:"hidden"})),(0,s.SB)("expanded",(0,s.oB)({height:"*",visibility:""})),(0,s.eR)("expanded <=> collapsed, void => collapsed",(0,s.jt)(D))])},R=new i.OlP("MAT_EXPANSION_PANEL");let J=(()=>{class n{constructor(t,e){this._template=t,this._expansionPanel=e}}return n.\u0275fac=function(t){return new(t||n)(i.Y36(i.Rgc),i.Y36(R,8))},n.\u0275dir=i.lG2({type:n,selectors:[["ng-template","matExpansionPanelContent",""]]}),n})(),tt=0;const A=new i.OlP("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS");let L=(()=>{class n extends j{get hideToggle(){return this._hideToggle||this.accordion&&this.accordion.hideToggle}set hideToggle(t){this._hideToggle=(0,u.Ig)(t)}get togglePosition(){return this._togglePosition||this.accordion&&this.accordion.togglePosition}set togglePosition(t){this._togglePosition=t}constructor(t,e,o,r,d,l,b){super(t,e,o),this._viewContainerRef=r,this._animationMode=l,this._hideToggle=!1,this.afterExpand=new i.vpe,this.afterCollapse=new i.vpe,this._inputChanges=new f.x,this._headerId="mat-expansion-panel-header-"+tt++,this._bodyAnimationDone=new f.x,this.accordion=t,this._document=d,this._bodyAnimationDone.pipe((0,Q.x)((m,p)=>m.fromState===p.fromState&&m.toState===p.toState)).subscribe(m=>{"void"!==m.fromState&&("expanded"===m.toState?this.afterExpand.emit():"collapsed"===m.toState&&this.afterCollapse.emit())}),b&&(this.hideToggle=b.hideToggle)}_hasSpacing(){return!!this.accordion&&this.expanded&&"default"===this.accordion.displayMode}_getExpandedState(){return this.expanded?"expanded":"collapsed"}toggle(){this.expanded=!this.expanded}close(){this.expanded=!1}open(){this.expanded=!0}ngAfterContentInit(){this._lazyContent&&this._lazyContent._expansionPanel===this&&this.opened.pipe((0,P.O)(null),(0,v.h)(()=>this.expanded&&!this._portal),(0,z.q)(1)).subscribe(()=>{this._portal=new g.UE(this._lazyContent._template,this._viewContainerRef)})}ngOnChanges(t){this._inputChanges.next(t)}ngOnDestroy(){super.ngOnDestroy(),this._bodyAnimationDone.complete(),this._inputChanges.complete()}_containsFocus(){if(this._body){const t=this._document.activeElement,e=this._body.nativeElement;return t===e||e.contains(t)}return!1}}return n.\u0275fac=function(t){return new(t||n)(i.Y36(M,12),i.Y36(i.sBO),i.Y36(w.A8),i.Y36(i.s_b),i.Y36(h.K0),i.Y36(i.QbO,8),i.Y36(A,8))},n.\u0275cmp=i.Xpm({type:n,selectors:[["mat-expansion-panel"]],contentQueries:function(t,e,o){if(1&t&&i.Suo(o,J,5),2&t){let r;i.iGM(r=i.CRH())&&(e._lazyContent=r.first)}},viewQuery:function(t,e){if(1&t&&i.Gf(V,5),2&t){let o;i.iGM(o=i.CRH())&&(e._body=o.first)}},hostAttrs:[1,"mat-expansion-panel"],hostVars:6,hostBindings:function(t,e){2&t&&i.ekj("mat-expanded",e.expanded)("_mat-animation-noopable","NoopAnimations"===e._animationMode)("mat-expansion-panel-spacing",e._hasSpacing())},inputs:{disabled:"disabled",expanded:"expanded",hideToggle:"hideToggle",togglePosition:"togglePosition"},outputs:{opened:"opened",closed:"closed",expandedChange:"expandedChange",afterExpand:"afterExpand",afterCollapse:"afterCollapse"},exportAs:["matExpansionPanel"],features:[i._Bn([{provide:M,useValue:void 0},{provide:R,useExisting:n}]),i.qOj,i.TTD],ngContentSelectors:Z,decls:7,vars:4,consts:[["role","region",1,"mat-expansion-panel-content",3,"id"],["body",""],[1,"mat-expansion-panel-body"],[3,"cdkPortalOutlet"]],template:function(t,e){1&t&&(i.F$t(Y),i.Hsn(0),i.TgZ(1,"div",0,1),i.NdJ("@bodyExpansion.done",function(r){return e._bodyAnimationDone.next(r)}),i.TgZ(3,"div",2),i.Hsn(4,1),i.YNc(5,U,0,0,"ng-template",3),i.qZA(),i.Hsn(6,2),i.qZA()),2&t&&(i.xp6(1),i.Q6J("@bodyExpansion",e._getExpandedState())("id",e.id),i.uIk("aria-labelledby",e._headerId),i.xp6(4),i.Q6J("cdkPortalOutlet",e._portal))},dependencies:[g.Pl],styles:['.mat-expansion-panel{--mat-expansion-container-shape:4px;box-sizing:content-box;display:block;margin:0;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative;background:var(--mat-expansion-container-background-color);color:var(--mat-expansion-container-text-color);border-radius:var(--mat-expansion-container-shape)}.mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:var(--mat-expansion-container-shape);border-top-left-radius:var(--mat-expansion-container-shape)}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:var(--mat-expansion-container-shape);border-bottom-left-radius:var(--mat-expansion-container-shape)}.cdk-high-contrast-active .mat-expansion-panel{outline:solid 1px}.mat-expansion-panel.ng-animate-disabled,.ng-animate-disabled .mat-expansion-panel,.mat-expansion-panel._mat-animation-noopable{transition:none}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible;font-family:var(--mat-expansion-container-text-font);font-size:var(--mat-expansion-container-text-size);font-weight:var(--mat-expansion-container-text-weight);line-height:var(--mat-expansion-container-text-line-height);letter-spacing:var(--mat-expansion-container-text-tracking)}.mat-expansion-panel-content[style*="visibility: hidden"] *{visibility:hidden !important}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px;border-top-color:var(--mat-expansion-actions-divider-color)}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}'],encapsulation:2,data:{animation:[E.bodyExpansion]},changeDetection:0}),n})();class et{}const at=(0,_.sb)(et);let S=(()=>{class n extends at{constructor(t,e,o,r,d,l,b){super(),this.panel=t,this._element=e,this._focusMonitor=o,this._changeDetectorRef=r,this._animationMode=l,this._parentChangeSubscription=B.w0.EMPTY;const m=t.accordion?t.accordion._stateChanges.pipe((0,v.h)(p=>!(!p.hideToggle&&!p.togglePosition))):G.E;this.tabIndex=parseInt(b||"")||0,this._parentChangeSubscription=(0,$.T)(t.opened,t.closed,m,t._inputChanges.pipe((0,v.h)(p=>!!(p.hideToggle||p.disabled||p.togglePosition)))).subscribe(()=>this._changeDetectorRef.markForCheck()),t.closed.pipe((0,v.h)(()=>t._containsFocus())).subscribe(()=>o.focusVia(e,"program")),d&&(this.expandedHeight=d.expandedHeight,this.collapsedHeight=d.collapsedHeight)}get disabled(){return this.panel.disabled}_toggle(){this.disabled||this.panel.toggle()}_isExpanded(){return this.panel.expanded}_getExpandedState(){return this.panel._getExpandedState()}_getPanelId(){return this.panel.id}_getTogglePosition(){return this.panel.togglePosition}_showToggle(){return!this.panel.hideToggle&&!this.panel.disabled}_getHeaderHeight(){const t=this._isExpanded();return t&&this.expandedHeight?this.expandedHeight:!t&&this.collapsedHeight?this.collapsedHeight:null}_keydown(t){switch(t.keyCode){case y.L_:case y.K5:(0,y.Vb)(t)||(t.preventDefault(),this._toggle());break;default:return void(this.panel.accordion&&this.panel.accordion._handleHeaderKeydown(t))}}focus(t,e){t?this._focusMonitor.focusVia(this._element,t,e):this._element.nativeElement.focus(e)}ngAfterViewInit(){this._focusMonitor.monitor(this._element).subscribe(t=>{t&&this.panel.accordion&&this.panel.accordion._handleHeaderFocus(this)})}ngOnDestroy(){this._parentChangeSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._element)}}return n.\u0275fac=function(t){return new(t||n)(i.Y36(L,1),i.Y36(i.SBq),i.Y36(T.tE),i.Y36(i.sBO),i.Y36(A,8),i.Y36(i.QbO,8),i.$8M("tabindex"))},n.\u0275cmp=i.Xpm({type:n,selectors:[["mat-expansion-panel-header"]],hostAttrs:["role","button",1,"mat-expansion-panel-header","mat-focus-indicator"],hostVars:15,hostBindings:function(t,e){1&t&&i.NdJ("click",function(){return e._toggle()})("keydown",function(r){return e._keydown(r)}),2&t&&(i.uIk("id",e.panel._headerId)("tabindex",e.tabIndex)("aria-controls",e._getPanelId())("aria-expanded",e._isExpanded())("aria-disabled",e.panel.disabled),i.Udp("height",e._getHeaderHeight()),i.ekj("mat-expanded",e._isExpanded())("mat-expansion-toggle-indicator-after","after"===e._getTogglePosition())("mat-expansion-toggle-indicator-before","before"===e._getTogglePosition())("_mat-animation-noopable","NoopAnimations"===e._animationMode))},inputs:{tabIndex:"tabIndex",expandedHeight:"expandedHeight",collapsedHeight:"collapsedHeight"},features:[i.qOj],ngContentSelectors:X,decls:5,vars:3,consts:[[1,"mat-content"],["class","mat-expansion-indicator",4,"ngIf"],[1,"mat-expansion-indicator"]],template:function(t,e){1&t&&(i.F$t(K),i.TgZ(0,"span",0),i.Hsn(1),i.Hsn(2,1),i.Hsn(3,2),i.qZA(),i.YNc(4,q,1,1,"span",1)),2&t&&(i.ekj("mat-content-hide-toggle",!e._showToggle()),i.xp6(4),i.Q6J("ngIf",e._showToggle()))},dependencies:[h.O5],styles:['.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1);height:var(--mat-expansion-header-collapsed-state-height);font-family:var(--mat-expansion-header-text-font);font-size:var(--mat-expansion-header-text-size);font-weight:var(--mat-expansion-header-text-weight);line-height:var(--mat-expansion-header-text-line-height);letter-spacing:var(--mat-expansion-header-text-tracking)}.mat-expansion-panel-header.mat-expanded{height:var(--mat-expansion-header-expanded-state-height)}.mat-expansion-panel-header[aria-disabled=true]{color:var(--mat-expansion-header-disabled-state-text-color)}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-header-hover-state-layer-color)}@media(hover: none){.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-container-background-color)}}.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused{background:var(--mat-expansion-header-focus-state-layer-color)}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-content.mat-content-hide-toggle{margin-right:8px}[dir=rtl] .mat-content.mat-content-hide-toggle{margin-right:0;margin-left:8px}.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-right:24px;margin-left:0}.mat-expansion-panel-header-title{color:var(--mat-expansion-header-text-color)}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description{color:inherit}.mat-expansion-panel-header-description{flex-grow:2;color:var(--mat-expansion-header-description-color)}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle;color:var(--mat-expansion-header-indicator-color)}.cdk-high-contrast-active .mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}'],encapsulation:2,data:{animation:[E.indicatorRotate]},changeDetection:0}),n})(),nt=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275dir=i.lG2({type:n,selectors:[["mat-panel-title"]],hostAttrs:[1,"mat-expansion-panel-header-title"]}),n})(),it=(()=>{class n extends H{constructor(){super(...arguments),this._ownHeaders=new i.n_E,this._hideToggle=!1,this.displayMode="default",this.togglePosition="after"}get hideToggle(){return this._hideToggle}set hideToggle(t){this._hideToggle=(0,u.Ig)(t)}ngAfterContentInit(){this._headers.changes.pipe((0,P.O)(this._headers)).subscribe(t=>{this._ownHeaders.reset(t.filter(e=>e.panel.accordion===this)),this._ownHeaders.notifyOnChanges()}),this._keyManager=new T.Em(this._ownHeaders).withWrap().withHomeAndEnd()}_handleHeaderKeydown(t){this._keyManager.onKeydown(t)}_handleHeaderFocus(t){this._keyManager.updateActiveItem(t)}ngOnDestroy(){super.ngOnDestroy(),this._keyManager?.destroy(),this._ownHeaders.destroy()}}return n.\u0275fac=function(){let a;return function(e){return(a||(a=i.n5z(n)))(e||n)}}(),n.\u0275dir=i.lG2({type:n,selectors:[["mat-accordion"]],contentQueries:function(t,e,o){if(1&t&&i.Suo(o,S,5),2&t){let r;i.iGM(r=i.CRH())&&(e._headers=r)}},hostAttrs:[1,"mat-accordion"],hostVars:2,hostBindings:function(t,e){2&t&&i.ekj("mat-accordion-multi",e.multi)},inputs:{multi:"multi",hideToggle:"hideToggle",displayMode:"displayMode",togglePosition:"togglePosition"},exportAs:["matAccordion"],features:[i._Bn([{provide:M,useExisting:n}]),i.qOj]}),n})(),ot=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({imports:[h.ez,_.BQ,W,g.eL]}),n})();const rt=[{path:"",component:(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=i.Xpm({type:n,selectors:[["app-faqs-lists"]],decls:19,vars:0,consts:[["expanded",""]],template:function(t,e){1&t&&(i.TgZ(0,"mat-accordion")(1,"mat-expansion-panel",0)(2,"mat-expansion-panel-header")(3,"mat-panel-title"),i._uU(4," REGISTRATION REQUIREMENT "),i.qZA()(),i.TgZ(5,"p"),i._uU(6,"Partners are required to pay registration fee for special treatment of their properties. As a new partner, you will be in the premium category as soon as we onboard you for a period."),i.qZA()(),i.TgZ(7,"mat-expansion-panel")(8,"mat-expansion-panel-header")(9,"mat-panel-title"),i._uU(10," Why Must I Pay to Register? "),i.qZA()(),i.TgZ(11,"p"),i._uU(12,"Partners are required to pay registration fee for special treatment of their properties. As a new partner, you will be in the premium category as soon as we onboard you for a period."),i.qZA()(),i.TgZ(13,"mat-expansion-panel")(14,"mat-expansion-panel-header")(15,"mat-panel-title"),i._uU(16," MANAGEMENT TEAM "),i.qZA()(),i.TgZ(17,"p"),i._uU(18,"Partners are required to pay registration fee for special treatment of their properties. As a new partner, you will be in the premium category as soon as we onboard you for a period."),i.qZA()()())},dependencies:[it,L,S,nt],styles:[".mat-expansion-panel[_ngcontent-%COMP%]{margin-bottom:16px;border-radius:8px;box-shadow:0 2px 4px #0000001a}.mat-expansion-panel-header[_ngcontent-%COMP%]{background-color:#f5f5f5;border-bottom:1px solid #ddd}.mat-panel-title[_ngcontent-%COMP%]{font-weight:700}.mat-expansion-panel-content[_ngcontent-%COMP%]{padding:16px}"]}),n})()}];let st=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({imports:[I.Bz.forChild(rt),I.Bz]}),n})();var dt=c(7131);c(2831);let ht=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({imports:[h.ez,_.BQ,g.eL,_.si,dt.Q8,T.rt,_.BQ]}),n})(),ut=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({imports:[h.ez,st,ht,ot]}),n})()}}]);