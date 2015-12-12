<?xml version="1.0" encoding="utf-8" standalone="no"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0">



<xsl:template match="/">
<rss version="2.0">
<channel>
    <title>RSS Feed</title>
    <link>https://https:was-new-oldowling.c9users.io/</link>
    <description>Check Updates on the funds</description>
      <xsl:for-each select="//manager">
          <item>
         <title>
            New manager name for: <xsl:value-of select="@name"/>
         </title>
         <link>https://was-new-oldowling.c9users.io</link>
         <xsl:for-each select="manager[1]">
         <description>
           <![CDATA[<p>Net asset value..<b>]]>
                <xsl:value-of select="NAV"/>
            <![CDATA[</b></p><p>Bid price............<b> ]]>
                <xsl:value-of select="bid"/>
            <![CDATA[</b></p><p>Offer price.........<b> ]]>
                <xsl:value-of select="offer"/>
            <![CDATA[</b></p>]]>
         </description>
        
         </xsl:for-each>
         </item>
      </xsl:for-each>
</channel>
</rss>
</xsl:template>
</xsl:stylesheet>