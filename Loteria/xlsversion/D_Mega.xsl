<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/table">
	<html>
	    <head>
			<script type="text/javascript" src="D_MEGA.js"/>
			<link rel="stylesheet" type="text/css" href="D_MEGA.css"/>
		</head>
		<body>
			Total:<xsl:value-of select='count(tr)-1'/><br/>
			<!--button id ="btndez" type="button" onclick="setStatus('dez')">Dezena</button>
			<button id ="btnuni" type="button" onclick="setStatus('uni')">Unidade</button-->
			<table>
				<tr style="font-weight:bold;">
					<xsl:apply-templates select='tr/th'/>
				</tr>
				<xsl:for-each select='tr'>
					<tr>
					<xsl:if test='count(td) &gt; 0'>
						<xsl:apply-templates select='td'/>
					</xsl:if>
					</tr>
				</xsl:for-each>
			</table>
		</body>
	</html>
</xsl:template>

<xsl:template match='th'>
	<xsl:if test='position() = 1 or (position() &gt;2 and position() &lt;9)'>
		<td>
			<xsl:value-of select='.'/>
		</td>
	</xsl:if>
</xsl:template>

<xsl:template match='td'>
	<xsl:choose>
		<xsl:when test='position() = 1'>
			<td style="font-weight:bold;">
				<xsl:value-of select='.'/>
			</td>
		</xsl:when>
		<xsl:when test='position() &gt;2 and position() &lt;9'>
			<td>
			<center>
			<span name="dez" style="visibility:visible;">
				<xsl:call-template name='quo'>
					<xsl:with-param name="value" select='.'/>
				</xsl:call-template>
			</span>
			<span name="uni" style="visibility:visible;">
				<xsl:value-of select='. mod 10'/>
			</span>
			</center>
			</td>
		</xsl:when>
	</xsl:choose>
</xsl:template>

<xsl:template name='quo'>
 <xsl:param name='value'/>
 <xsl:variable name='result' select='$value div 10'/>
 <xsl:choose>
	<xsl:when test='$result &gt; 0'>
		<xsl:choose>
			<xsl:when test='$value mod 10 = 0'>
				<xsl:value-of select='$result'/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select='substring-before($result,".")'/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:when>
	<xsl:otherwise>
		<xsl:value-of select='0'/>
	</xsl:otherwise>
 </xsl:choose>
</xsl:template>

</xsl:stylesheet>