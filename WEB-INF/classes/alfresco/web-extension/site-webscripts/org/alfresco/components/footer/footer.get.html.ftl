<@markup id="css" >
   <#-- CSS Dependencies -->
   <@link href="${url.context}/res/modules/about-share.css" group="footer"/>
   <@link href="${url.context}/res/components/footer/footer.css" group="footer"/>
</@>

<@markup id="js">
   <@script src="${url.context}/res/modules/about-share.js" group="footer"/>
</@>

<@markup id="widgets">
   <@createWidgets/>
</@>

<@markup id="html">
   <@uniqueIdDiv>
      <#assign fc=config.scoped["Edition"]["footer"]>
      <div class="footer ${fc.getChildValue("css-class")!"footer-com"}">
         <span class="copyright">
            <a href="#"><img src="${url.context}/res/themes/eisenVaultTheme/images/app-logo-share.png" alt="EisenVault Secure Document Storage" border="0"/></a>
            <#if licenseHolder != "" && licenseHolder != "UNKNOWN">
               <span class="licenseHolder">${msg("label.licensedTo")} ${licenseHolder}</span><br>
            </#if>
            <span>${msg(fc.getChildValue("label")!"label.copyright")}</span>
         </span>
      </div>
   </@>
</@>
