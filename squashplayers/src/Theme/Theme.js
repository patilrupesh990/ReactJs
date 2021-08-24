import styled from "styled-components";
const Main =  'main-panel';
const fixed = 'fixed-bottom-btn'


export default styled.div`
& .${fixed} {
    height:${props=>( "calc(100% - 45px)")};
    width: ${props=>( "calc(100% - 240px)")};
}
& .${Main} {
height:${props=>( "calc(100% - 45px)")};
margin-top:"45px";
width:"100% ";
}`