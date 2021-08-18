import * as React from "react";

import { Typography, Grid, CssBaseline } from "@material-ui/core";

import useStyles from "./Style";

import dia1 from "./dia1.jpg";
import dia3 from "./dia3.png";

import asis from "./as-is.png";
import tobe from "./to-be.png";

function LandingContents() {
  const classes = useStyles();
  return (
    <>
      <Grid container={true} className={classes.container}>
        <Grid item={true} className={classes.gridContents} xs={6} md={6} lg={6}>
          <img src={dia1} />
        </Grid>
        <Grid item={true} className={classes.gridContents} xs={6} md={6} lg={6}>
          <Typography variant="h6" color="textPrimary">
            <b>블록체인의 진정한 가치는 신뢰 비용의 문제를 해결하는 것입니다.</b>
          </Typography>
          <Typography variant="body1" color="textPrimary">
            Diamond Chain은 블록체인의 진정한 가치를 최대로 활용할 수 있는 실제 비즈니스 문제의 솔루션을 제공하는데 자부심을 가지고 있습니다.
          </Typography>
        </Grid>
        <Grid item={true} className={classes.gridContents} xs={12} md={12} lg={12}>
          {" "}
          <CssBaseline />
          {" "}
        </Grid>
        <Grid item={true} className={classes.gridContents} xs={6} md={6} lg={6}>
          <Typography variant="body1" color="textPrimary">
            또한, 우리나라는 다이아몬드 등 보석 및 귀금속 수입에 있어 관세 이외에도 26%의 고액의 개별 소비세를 부과하여 왔기 때문에 수입상 및 소비자 입장에서 세금을 피할 방법을 찾게 되었고 시장이 음성화 되어 있었습니다.<br /><br />
            국회에서는 이러한 문제를 해결하고자 2018년 11월 다이아몬드 원석에 대해서는 개별소비세(교육세 포함 26%)를 폐지하고 다이아몬드 시장 의 양성화를 꾀하고 있습니다.<br />
            <br />
            Diamond Chain 프로젝트는 퍼블릭 블록체인을 통해 다이아몬드 도매거래를 제공함으로써 투명성을 제공하여 이러한 국가정책에 부합하고 있습니다.
          </Typography>
        </Grid>
        <Grid item={true} className={classes.gridContents} xs={6} md={6} lg={6}>
          <img src={dia3} width="400" />
        </Grid>
        <Grid item={true} className={classes.gridContents} xs={12} md={12} lg={12}>
          {" "}
          <CssBaseline />
          {" "}
        </Grid>
        <Grid item={true} className={classes.gridContents} xs={12} md={12} lg={12}>
          <img src={tobe} width="800" />
        </Grid>
        <Grid item={true} className={classes.gridContents} xs={12} md={12} lg={12}>
          <Typography variant="body1" color="textPrimary">
            Diamond Chain 프로젝트는 우리나라 다이아몬드 시장의 관행이 상인들에게 매년 수천억원의 감내하기 힘든 신뢰비용을 지불하고 있다는 것을 발견했고 이 문제를 블록체인으로 풀어 내었습니다.<br /><br />
            De-Fi 개념을 적용해 투자를 통한 담보를 통해 신뢰문제를 풀어 내었고, 투자자들은 리스크를 감당하는 댓가로 거래 수수료를 수익으로 얻을 수 있습니다.<br />
            De-Fi를 산업에 적용함에는 유동성 문제가 반드시 따르게 됩니다. Diamond Chain 프로젝트는 추후 소비자 개인이 소유한 잠자는 다이아몬드 및 귀금속을 통한 CDP 발행으로 유동성을 확보하는 방안을 고려하고 있습니다.
          </Typography>
        </Grid>
        <Grid item={true} className={classes.gridContents} xs={12} md={12} lg={12}>
          {" "}
          <CssBaseline />
          {" "}
        </Grid>
        <Grid item={true} className={classes.gridContents} xs={6} md={6} lg={6}>
          <Typography variant="body1" color="textPrimary">
            영업 비밀의 보장과 범죄 노출로부터 상인들을 보호하기 위해 zk-Snark 기술을 활용한 Privacy를 제공합니다.<br />
            또한, 다이아몬드 가격의 공정한 제공을 위해 공공데이터를 활용한 Oraclize 기술을 적용하였습니다.<br /><br />
          </Typography>
        </Grid>
        <Grid item={true} className={classes.gridContents} xs={6} md={6} lg={6}>
          <img src={asis} width="400" />
        </Grid>
      </Grid>
    </>
  );
}

export default LandingContents;
