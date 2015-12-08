<?xml version="1.0" encoding="utf-8" standalone="no"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0">

<xsl:template match="/">
<rss version="2.0">
<channel>
    <title>Latest prices</title>
    <link>https://wad-ca-kamillasecki.c9.io</link>
    <description>Check regulaly for latest prices</description>
      <xsl:for-each select="//fund">
          <item>
         <title>
            Latest prices for: <xsl:value-of select="@code"/>
         </title>
         <link>https://wad-ca-kamillasecki.c9.io/</link>
         <xsl:for-each select="price[1]">
         <description>
            <![CDATA[<p>Net asset value..<b>]]>
                <xsl:value-of select="NAV"/>
            <![CDATA[</b></p><p>Bid price............<b> ]]>
                <xsl:value-of select="bid"/>
            <![CDATA[</b></p><p>Offer price.........<b> ]]>
                <xsl:value-of select="offer"/>
            <![CDATA[</b></p>]]>
         </description>
         <pubDate><xsl:value-of select="@date"/></pubDate>
         </xsl:for-each>
         </item>
      </xsl:for-each>
</channel>
</rss>
</xsl:template>
</xsl:stylesheet>